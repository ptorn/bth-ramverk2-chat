import React, { Component } from 'react';

const Square = (props) => {
    return (
        <td id={props.id} className="marker-square" onClick={() => props.callback(props.id)}>
            {props.value}
        </td>
    );
};

const Row = (props) => {
    let squares = props.board.map((block, id) => {
        if (block === 0) {
            return (<Square id={id + props.id} key={id} value={""} callback={props.callback} />);
        }
        let token = block === 1 ? "X" : "O";

        return (<Square id={id} key={id} value={token} callback={() => null} />);
    });

    return (
        <tr>
            {squares}
        </tr>
    );
};

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board,
            size: props.size,
        };
    }

    render() {
        let rows = [];

        for (let row = 0; row < this.props.size; row++) {
            let start = row * this.props.size;
            let board = this.props.board.slice(start, start + this.props.size);

            rows.push(
                <Row
                    key={row}
                    id={row * this.props.size}
                    board={board}
                    callback={this.props.callback}
                />
            );
        }
        return (
            <div>
                <div style={{margin: '0 auto', display: 'flex'}}>
                    <table className="gomoku-table table-bordered">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
