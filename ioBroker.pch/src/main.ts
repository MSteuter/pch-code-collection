import * as utils from '@iobroker/adapter-core';
import {CleanHome} from 'clean-home';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Mapper} from './mapper';
import {PchDefinition} from './pch-definition';
import {PchLogger} from './pch-logger';

/**
 * @author Christopher Holomek
 * @since 25.04.2020
 */
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ioBroker {
        interface AdapterConfig {
            // Define the shape of your options here (recommended)
            host: string;

            // Or use a catch-all approach
            [key: string]: any;
        }
    }
}

export class Pch extends utils.Adapter {

    private cleanHome: CleanHome | undefined;
    private ngUnsubscribe: Subject<any> = new Subject();

    public constructor(options: Partial<ioBroker.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'pch',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Overwrite configuration
        this.log.silly('onReady called. Load configuration');

        this.config.host = this.config.host ? this.config.host.trim() : '';

        // The adapters config (in the instance object everything under the attribute "native") is accessible via
        // this.config:
        this.log.debug('config host: ' + this.config.host);

        let cleanHome = new CleanHome(this.config.host, 5683, new PchLogger(this));
        this.cleanHome = cleanHome;

        cleanHome.status().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
            const data = (response as any).state.reported;

            const deviceId = data.DeviceId;

            this.setObjectNotExists(data.DeviceId, {
                type: 'device',
                common: {
                    name: deviceId,
                    read: true
                },
                native: {device: deviceId},
            });


            Object.keys(data).forEach(key => {
                this.createAndSetState(deviceId, key, data);
                if (key === 'Runtime') {
                    // manipulate data
                    data['RuntimeReadable'] = data[key];
                    this.createAndSetState(deviceId, 'RuntimeReadable', data);
                }
            });

            this.subscribeStates('*');
        });
    }

    private createAndSetState(deviceId: string, key: string, data: any) {
        const id = deviceId + '.' + key;
        this.setObjectNotExists(id, {
            type: 'state',
            common: {
                name: PchDefinition.determineName(key, data[key]),
                type: PchDefinition.determineType(Mapper.toIoBroker(key, data[key])),
                role: PchDefinition.determineRole(key),
                read: true,
                write: PchDefinition.canWrite(key)
            },
            native: {id: id, device: deviceId, item: key},
        }, (err, obj) => {
            this.getState(id, (error, state) => {
                const newValue = Mapper.toIoBroker(key, data[key]);

                let setValue;
                if (state) {
                    setValue = !state.ack || state.val !== newValue;
                } else {
                    setValue = true;
                }
                if (setValue) {
                    this.setState(id, {val: Mapper.toIoBroker(key, data[key]), ack: true});
                }
            });
        });
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     */
    private onUnload(callback: () => void): void {
        try {
            if(this.cleanHome) {
                this.cleanHome.stopSubscribe();
            }
            this.ngUnsubscribe.next(true);
            this.ngUnsubscribe.complete();
            this.log.info('cleaned everything up...');
            callback();
        } catch (e) {
            callback();
        }
    }

    /**
     * Is called if a subscribed state changes
     */
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            if (!state.ack) {
                // The state was changed
                this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);

                if (this.cleanHome) {
                    const cleanHome = this.cleanHome;
                    this.getObject(id, (err, obj) => {
                        if (obj) {
                            const item = obj.native.item;
                            if (item) {
                                const value = Mapper.toDevice(item, state.val);
                                if (value) {
                                    cleanHome.control(item, value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
                                        this.log.debug(`Value set for: id=${id}`);
                                    }, error => {
                                        this.log.warn(`Could not set value for: id=${id}`);
                                        this.log.error(error);
                                    });
                                } else {
                                    this.log.warn(`Set value blocked for id or mappings failed=${id}`);
                                }
                            }
                        }
                    });
                }
            }
        } else {
            // The state was deleted
            // Currently we do not need this
        }
    }
}

if (module.parent) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<ioBroker.AdapterOptions> | undefined) => new Pch(options);
} else {
    // otherwise start the instance directly
    (() => new Pch())();
}
