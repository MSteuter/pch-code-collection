const path = require("path");
const {tests} = require("@iobroker/testing");
const {Observable} = require("rxjs");

const cleanHomeMock = {
    CleanHome: function() {
        return {
            doSomething: () => {
            },
        }
    }
};

// Run unit tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.unit(path.join(__dirname, ".."), {
        startTimeout: 20000,
        additionalMockedModules: {
            "clean-home": cleanHomeMock
        },
        overwriteAdapterConfig: (config) => {

            config.systemPassword = 'Test';
            config.identifier = 'Test';
            config.pairingDelay = 1000;
            config.host = '127.0.0.1';
            config.mac = 'xx-xx-xx-xx-xx';
            config.certsPath = '/test';


            return config;
        }
    }
);

