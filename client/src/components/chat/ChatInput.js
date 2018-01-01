import React, { Component } from 'react';

export default class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }
    onInputChange(event) {
        let value = event.target.value;

        this.setState(() => {
            return {content: value};
        });
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.callback();
        }
    }
    callback() {
        this.props.callback(this.state.content);
        this.setState({content: ""});
    }
    render() {
        return (
            <div className="chat-input-field">
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.state.content}
                    onChange={this.onInputChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <button onClick={() => this.callback()}>
                    {this.props.buttonValue}
                </button>
            </div>
        );
    }
}
