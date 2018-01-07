let dbwebb = process.env.DBWEBB_PORT !== undefined ? "localhost:" + process.env.DBWEBB_PORT : false;
const Config = {
    wsServer: process.env.DBWEBB_WSSERVER ||
        dbwebb ||
        "localhost:3001"
};

module.exports = Config;
