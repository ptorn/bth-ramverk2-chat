let port = process.env.DBWEBB_PORT !== undefined ?
    process.env.DBWEBB_PORT :
    "3001";
let server = () => {
    let hostname = document.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return hostname;
    }
    port = "4000";
    return "ptorn.se";
};

const Config = {
    wsServer: server() + ":" + port
};

module.exports = Config;
