const port = process.env.DBWEBB_PORT !== undefined ?
    process.env.DBWEBB_PORT :
    "3000";
const server = "localhost";
const Config = {
    wsServer: server + ":" + port
};

module.exports = Config;
