import React, { Component } from 'react';

export default class GomokuSidebar extends Component {
    render() {
        return (
            <div>
                <div className="col-md-2">
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
