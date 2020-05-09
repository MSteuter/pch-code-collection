export const NAMES: { [TypeName: string]: (value: string) => string } = {
    name: (value) => value,
    type: () => 'Type',
    modelid: () => 'Model Id',
    swversion: () => 'Software version',
    language: () => 'Language',
    DeviceVersion: () => 'Device version',
    om: () => 'Fan speed', // s: silent, t: turbo, number
    pwr: () => 'Power', // 1: ON, 2: OFF
    cl: () => 'Child lock', // true, false
    aqil: () => 'Light brightness', // number
    uil: () => 'Button light', // 1: ON, 2: OFF
    uaset: () => 'XXX', // Target ??? A: Auto?
    mode: () => 'Mode', // AG: Auto, S: silent
    pm25: () => 'PM2.5', // number
    iaql: () => 'Indoor Allergy Index',
    aqit: () => 'Air quality threshold',  // 1, 4, 7, 10 seems to be some values which are relevant | AirSettingsActivity
    tvoc: () => 'TVOC', // 1 <= 0,3 | 2 > 0,3-1 | 3 > 1-3 | 4 3-10 | 5 > 10
    ddp: () => 'Display', // 0: IAI, 1: PM2.5, 2: Gas
    rddp: () => 'Display', // 0: IAI, 1: PM2.5, 2: Gas
    err: () => 'Error', // 0: noError
    fltt1: () => 'Filter 1',
    fltt2: () => 'Filter 2',
    fltsts0: () => 'Clean Filter hours left',
    fltsts1: () => 'Filter Statistik 1',
    fltsts2: () => 'Filter Statistik 2',
    filna: () => 'XXX',
    filid: () => 'XXX',
    ota: () => 'XXX',
    Runtime: () => 'Runtime',
    RuntimeReadable: () => 'Readable Runtime',
    WifiVersion: () => 'Wifi Version',
    ProductId: () => 'Product Id',
    DeviceId: () => 'Device Id',
    StatusType: () => 'Status',
    ConnectType: () => 'Connection',
};