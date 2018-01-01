import React, { Component } from "react";
import { ChatForm } from "./ChatForm";
import { ConnectForm } from "./ConnectForm";

export default class Connect extends Component {
    constructor(props) {
        super(props);
        this.state = {status: null};
    }

    login(content) {
        try {
            this.props.connect(content);
            this.setState({ status: null });
        } catch (error) {
            this.setState({status: error.message});
        }
    }
    render() {
        return (
            <div>
                { this.state.status !== null &&
                    <div>{this.state.status}</div>
                }
                {!this.props.connected &&
                    <ConnectForm
                        callback = {this.login.bind(this)}
                    />
                }
                {this.props.connected &&
                    <ChatForm
                        messages = {this.props.messages}
                        callback = {this.props.sendMessage}
                        users = {this.props.users}
                    />
                }
            </div>
        );
    }
}
