const Config = {
    wsServer: process.env.DBWEBB_WSSERVER ||
        // "localhost:" + process.env.DBWEBB_PORT ||
        "localhost:3001"
};

module.exports = Config;
