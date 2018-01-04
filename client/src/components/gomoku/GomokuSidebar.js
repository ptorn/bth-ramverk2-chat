import React, { Component } from 'react';

const History = (props) => {
    return props.history.map((record, id) => {
        let playerOne;
        let playerTwo;

        // Player 1
        if (record !== undefined && record.player1.status === "winner") {
            playerOne = <span style={{ color: 'green' }}>{record.player1.nick}</span>;
            playerTwo = <span style={{ color: 'red' }}>{record.player2.nick}</span>;
        } else {
            playerOne = <span style={{ color: 'red' }}>{record.player1.nick}</span>;
            playerTwo = <span style={{ color: 'green' }}>{record.player2.nick}</span>;
        }

        // Player 2

        return <li key={id}>{playerOne} - {playerTwo}</li>;
    });
};

export default class GomokuSidebar extends Component {
    render() {
        return (
            <div>
                <div className="col-md-2">
                    {this.props.game.player !== null &&
                    <div className="history">
                        <h4>Last 5 games</h4>
                        <History history={this.props.history}/>
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
                </div>
                {
                    this.props.game.player !== null &&
                    <div className="col-md-3">
                        <img src="images/wizard-side.png" alt="Wizard"/>
                    </div>
                }
            </div>
        );
    }
}
