/**
 * This class contains definitions for iobroker based on pch data
 *
 * @author Christopher Holomek
 * @since 25.04.2020
 */
import {CAN_WRITE} from './definition/can-write';
import {NAMES} from './definition/names';
import {ROLES} from "./definition/roles";

export class PchDefinition {

    public static canWrite(value: string): boolean {
        const func = CAN_WRITE[value];
        if (func !== null && typeof func !== 'undefined') {
            return func;
        }
        return true;
    }

    /**
     * Get type of a value from bsh
     *
     * @param value value to determine type for
     */
    public static determineType(value: any): string {
        if (Array.isArray(value)) {
            return 'array';
        }
        return typeof value;
    }


    /**
     * Get role of pch device state
     * @param key
     *        key of a device state
     */
    public static determineRole(key: string): string {
        const roleType = ROLES[key];

        if (roleType !== null && typeof roleType !== 'undefined') {
            return roleType;
        }

        return 'state';
    }

    static determineName(key: string, val: any) {
        const name = NAMES[key];

        if (name !== null && typeof name !== 'undefined') {
            return name(val);
        }

        return key;
    }
}


