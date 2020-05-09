import * as moment from 'moment';

export class Mapper {

    static toIoBroker(key: string, val: any) {
        try {
            switch (key) {
                case 'name':
                    return val;
                case 'type':
                    return val;
                case 'modelid':
                    return val;
                case 'swversion':
                    return val;
                case 'language':
                    return val;
                case 'DeviceVersion':
                    return val;
                case 'om':
                    return val;
                case 'pwr':
                    return val === '1';
                case 'cl':
                    return val;
                case 'aqil':
                    return val;
                case 'uil':
                    return val === '1';
                case 'uaset':
                    return val;
                case 'mode':
                    return val;
                case 'pm25':
                    return val;
                case 'iaql':
                    return val;
                case 'aqit':
                    return val;
                case 'tvoc':
                    return val;
                case 'ddp':
                    return val;
                case 'rddp':
                    return val;
                case 'err':
                    return val;
                case 'fltt1':
                    return val;
                case 'fltt2':
                    return val;
                case 'fltsts0':
                    return val;
                case 'fltsts1':
                    return val;
                case 'fltsts2':
                    return val;
                case 'filna':
                    return val;
                case 'filid':
                    return val;
                case 'ota':
                    return val;
                case 'RuntimeReadable':
                    return Mapper.toIsoString(moment.duration(val));
                case 'Runtime':
                case 'WifiVersion':
                case 'ProductId':
                case 'DeviceId':
                case 'StatusType':
                case 'ConnectType':
                default:
                    return val;
            }
        }catch (e) {
            return null;
        }
    }

    static toDevice(key: string, val: any): any {
        try {
            switch (key) {
                case 'name':
                    return null;
                case 'type':
                    return null;
                case 'modelid':
                    return null;
                case 'swversion':
                    return null;
                case 'language':
                    return null;
                case 'DeviceVersion':
                    return null;
                case 'om':
                    return val + '';
                case 'pwr':
                    return val ? '1' : '0';
                case 'cl':
                    return val;
                case 'aqil':
                    return val;
                case 'uil':
                    return val ? '1' : '0';
                case 'uaset':
                    return val + '';
                case 'mode':
                    return val + '';
                case 'pm25':
                    return val;
                case 'iaql':
                    return val;
                case 'aqit':
                    return val;
                case 'tvoc':
                    return val;
                case 'ddp':
                    return val + '';
                case 'rddp':
                    return val + '';
                case 'err':
                    return val;
                case 'fltt1':
                    return val + '';
                case 'fltt2':
                    return val + '';
                case 'fltsts0':
                    return val;
                case 'fltsts1':
                    return val;
                case 'fltsts2':
                    return val;
                case 'filna':
                    return val + '';
                case 'filid':
                    return val + '';
                case 'ota':
                    return val + '';
                case 'Runtime':
                case 'RuntimeReadable':
                case 'WifiVersion':
                case 'ProductId':
                case 'DeviceId':
                case 'StatusType':
                case 'ConnectType':
                    return null;
                default:
                    return val;
            }
        }catch (e) {
            return null;
        }
    }

    static toIsoString(duration: any) {
        // P3Y6M4DT12H30M5S
        const years = duration['_data'].years;
        const months = duration['_data'].months;
        const days = duration['_data'].days;
        const hours = duration['_data'].hours;
        const minutes = duration['_data'].minutes;
        const seconds = duration['_data'].seconds;

        return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
    }
}