import React, { Component } from 'react';

const History = (props) => {
    let lastFive = props.history.slice(Math.max(props.history.length - 5));

    return lastFive.map((record, id) => {
        let playerOne;
        let playerTwo;

        // Player 1
        if (record !== undefined && record.player1.status === "winner") {
            playerOne = <span className="label label-success">{record.player1.nick}</span>;
            playerTwo = <span className="label label-danger">{record.player2.nick}</span>;
        } else {
            playerOne = <span className="label label-danger">{record.player1.nick}</span>;
            playerTwo = <span className="label label-success">{record.player2.nick}</span>;
        }

        // Player 2

        return <li key={id}>{playerOne} - {playerTwo}</li>;
    });
};

export default class GomokuSidebar extends Component {
    render() {
        return (
            <div>
                <div className="history-container col-md-2">
                    {this.props.game.player !== null &&
                    <div className="history">
                        <h3>Last 5 games</h3>
                        <ul className="history-list">
                            <History history={this.props.history}/>
                        </ul>
                    </div>
                    }
                    {this.props.game.players.Player1 === null && this.props.game.player !== null &&
                        this.props.game.board.length !== 0 &&
                        <button onClick={() => { this.props.setPlayer(1); }} >Player 1</button>
                    }
                    {this.props.game.players.Player2 === null && this.props.game.player !== null &&
                        this.props.game.board.length !== 0 &&
                        <button onClick={() => { this.props.setPlayer(2); }} >Player 2</button>
                    }
                    {this.props.game.players.Player1 !== null &&
                        this.props.currentPlayer !== null &&
                    <div>Who's turn? Player {this.props.currentPlayer}!</div>
                    }
                </div>
                {
                    this.props.game.player !== null &&
                    <div className="col-md-3 center">
                        <img className="image-center" src="images/wizard-side.png" alt="Wizard"/>
                    </div>
                }
            </div>
        );
    }
}
