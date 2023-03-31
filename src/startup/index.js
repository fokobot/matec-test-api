const express = require('express');
const ws = require('./ws');

let _express = null;
let _config = null;


class Server {
    constructor({ config, router }) {
        _config = config;
        _express = express().use(router);
    }

    start() {
        ws();
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(`${_config.APPLICATION_NAME} API running on port ${_config.PORT}`);
                resolve();
            });
        });
    }
}

module.exports = Server;