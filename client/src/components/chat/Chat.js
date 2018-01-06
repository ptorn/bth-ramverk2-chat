import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ChatInput from "./ChatInput";

const ChatLine = (props) => {
    let time = new Date(props.time);
    let getTime = ('0' + time.getHours()).slice(-2) + ":" + ('0' + time.getMinutes()).slice(-2);
    let nick = (props.nick === "" ? "-" : "<" + props.nick + ">");

    return (
        <li>[{getTime}] {nick} {props.message}</li>
    );
};



const ChatWindow = (props) => {
    let messagesHtml = props.messages.map((message, id) => {
        return (
            <ChatLine
                key={id}
                nick={message.nick}
                message={message.message}
                time={message.time}
            />
        );
    });

    return (
        <div>
            {messagesHtml}
        </div>

    );
};



const UserName = (props) => {
    return <li><b>{props.item}</b></li>;
};



export default class Chat extends Component {
    scrollToBottom() {
        const node = ReactDOM.findDOMNode(this.messagesEnd);

        node.scrollTop = node.scrollHeight;
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        let usersList = this.props.users.map((item, id) => {
            return <UserName key={id} item={item} number={id} />;
        });

        return (
            <div className="chat-section col-md-12">
                <div className="chat-window col-md-9 rounded">
                    <div className="message-window rounded"
                        ref={(el) => { this.messagesEnd = el; }}>
                        <ul>
                            <ChatWindow
                                messages = {this.props.messages}
                            />
                        </ul>
                    </div>
                    <hr />
                    <ChatInput
                        content = {this.props.content}
                        buttonValue = {this.props.buttonValue}
                        callback = {this.props.callback}
                    />
                </div>
                <div className="user-window col-md-3">
                    <h4>Who is here?</h4>
                    <ul className="userlist">
                        {usersList}
                    </ul>
                </div>
            </div>
        );
    }
}
