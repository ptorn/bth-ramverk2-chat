const Config = {
    // wsServer: "ptorn.se:4000"
    wsServer: process.env.DBWEBB_WSSERVER || "localhost:3001"
};

module.exports = Config;
