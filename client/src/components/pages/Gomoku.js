import React, { Component } from "react";
import Layout from '../Layout';
import GomokuBoard from '../gomoku/GomokuBoard';
import GomokuSidebar from '../gomoku/GomokuSidebar';
import Chat from "../chat/ChatLogin";
import Config from "../../config";

export default class Gomoku extends Component {
    constructor(props) {
        super(props);
        this.connect = this.connect.bind(this);
        this.placeToken = this.placeToken.bind(this);
        this.setPlayer = this.setPlayer.bind(this);
        console.log(Config.wsServer);
        
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            ws: new WebSocket("ws://" + Config.wsServer, "json"),
            nick: "",
            connected: false,
            game: {
                players: {
                    Player1: null,
                    Player2: null
                },
                player: null,
                board: [],
                size: 0,
                winner: null,
                currentPlayer: null,
            },
            history: [],
            chat: {
                users: [],
                messages: []
            },
        };
    }

    componentDidMount() {
        this.setState((previousState) => {
            previousState.ws.onmessage = (evt) => {
                let data = JSON.parse(evt.data);

                if (data.type === "message") {
                    this.setState((previousState) => {
                        return previousState.chat.messages.push(data.message);
                    });
                }
                if (data.type === "userList") {
                    this.setState((previousState) => {
                        previousState.chat.users = data.users;
                        return previousState;
                    });
                }
                if (data.type === "enterRoom") {
                    this.setState((previousState) => {
                        previousState.chat.users = data.users;
                        previousState.chat.messages.push(data.message);
                        previousState.game.board = data.game.board;
                        previousState.game.size = data.game.size;
                        previousState.game.winner = data.game.winner;
                        previousState.game.player = "spectator";
                        previousState.game.players = data.game.players;
                        previousState.history = data.history;
                        return previousState;
                    });
                }
                if (data.type === "updateRoom") {
                    this.setState((previousState) => {
                        previousState.chat.users = data.users;
                        previousState.game.board = data.game.board;
                        previousState.game.size = data.game.size;
                        previousState.game.winner = data.game.winner;
                        previousState.game.player = "spectator";
                        previousState.game.players = data.game.players;
                        previousState.history = data.history;
                        return previousState;
                    });
                }
                if (data.type === "gameStart") {
                    this.setState((previousState) => {
                        previousState.game.board = data.game.board;
                        previousState.game.size = data.game.size;
                        previousState.game.winner = data.game.winner;
                        previousState.game.players = data.game.players;
                        return previousState;
                    });
                }
                if (data.type === "setPlayer") {
                    if (data.status === 1) {
                        this.setState((previousState) => {
                            previousState.game.player = data.player;
                            return previousState;
                        });
                    }
                }
                if (data.type === "updatePlayers") {
                    this.setState((previousState) => {
                        previousState.game.players = data.players;
                        previousState.chat.messages.push(data.message);

                        return previousState;
                    });
                }
                if (data.type === "gamePlay") {
                    let player = this.state.game.player;

                    if (data.game.winner !== null) {
                        player = "spectator";
                    }
                    this.setState((previousState) => {
                        return previousState.game = {
                            board: data.game.board,
                            size: data.game.size,
                            winner: data.game.winner,
                            currentPlayer: data.game.currentPlayer,
                            player: player,
                            players: previousState.game.players,
                            history: data.history
                        };
                    });
                }
            };
            return previousState;
        });
    }

    componentWillUnmount() {
        this.state.ws.close();
    }

    connect(content) {
        if (content === "") {
            throw Error("Field is empty!");
        }
        if (this.state.chat.users.indexOf(content) !== -1) {
            throw Error("Nick is already taken!");
        }
        this.setState((previousState) => {
            previousState.connected = true;
            previousState.nick = content;

            return previousState;
        });
        this.state.ws.send(JSON.stringify({
            type: "createUser",
            user: {
                nick: content
            }
        }));
    }

    sendMessage(content) {
        this.state.ws.send(JSON.stringify({
            type: "message",
            nick: this.state.nick,
            message: content
        }));
    }

    placeToken(id) {
        let yValue = Math.floor(id/this.state.game.size);
        let size = this.state.game.size;
        let xValue = id - (yValue * size) === (size) ? 0 : id - yValue * size;

        this.state.ws.send(JSON.stringify({
            type: "placeToken",
            player: this.state.game.player,
            position: {
                x: xValue,
                y: yValue
            }
        }));
    }

    start(size) {
        this.state.ws.send(JSON.stringify({
            type: "createGame",
            size: size
        }));
    }

    setPlayer(playerId) {
        this.state.ws.send(JSON.stringify({
            type: "setPlayer",
            playerId: playerId
        }));
    }

    render() {
        let callback = this.state.game.winner === null ? this.placeToken : () => null;

        return (
            <Layout>
                <div className="mb-20">
                    <h1>BTH-Gomoku</h1>
                    {this.state.game.player !== null &&
                        <div>
                            {(this.state.game.board.length === 0 ||
                                this.state.game.winner !== null) &&
                            <div className="start-game center-div">
                                <div>
                                    <h3>
                                        To start a new game click the button
                                        and wait for an opponent!
                                    </h3>
                                </div>
                                <button
                                    className="enter"
                                    onClick={() => { this.start(20); }} >
                                    Create game
                                </button>
                            </div>
                            }
                        </div>
                    }
                    { this.state.game.player !== null &&
                    <div className="col-md-7 pl-0 pr-0">
                        <GomokuBoard
                            size={this.state.game.size}
                            board={this.state.game.board}
                            callback={callback}
                        />
                    </div>
                    }
                    <GomokuSidebar
                        setPlayer={this.setPlayer}
                        game={this.state.game}
                        history={this.state.history}
                    />
                    <Chat
                        connect={this.connect}
                        users={this.state.chat.users}
                        messages={this.state.chat.messages}
                        connected={this.state.connected}
                        sendMessage={this.sendMessage}
                    />
                </div>
            </Layout>
        );
    }
}
