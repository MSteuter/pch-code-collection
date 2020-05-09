export const ROLES: { [TypeName: string]: string } = {
    name: 'info.name',
    type: 'text',
    modelid: 'text',
    swversion: 'text',
    language: 'text',
    DeviceVersion: 'text',
    om: 'value.speed', // fan speed
    pwr: 'switch.power', // power
    cl: 'switch', // child lock
    aqil: 'level.dimmer', // light brightness
    uil: 'switch.light', // button light on / off
    uaset: 'text',
    mode: 'text',
    pm25: 'level',
    iaql: 'level',
    aqit: 'level',
    tvoc: 'level',
    ddp: 'text',
    rddp: 'text',
    err: 'indicator',
    fltt1: 'text',
    fltt2: 'text',
    fltsts0: 'indicator',
    fltsts1: 'indicator',
    fltsts2: 'indicator',
    filna: 'indicator',
    filid: 'indicator',
    ota: 'indicator',
    Runtime: 'indicator',
    RuntimeReadable: 'text',
    WifiVersion: 'text',
    ProductId: 'text',
    DeviceId: 'text',
    StatusType: 'text',
    ConnectType: 'text',
};
