import React from 'react';
import ChatInput from "./ChatInput";

export const ConnectForm = (props) => {
    return (
        <div className="login center-div">
            <p>Enter a username to present your self and enter the World of Gomoku</p>
            <ChatInput
                content={""}
                placeholder={"Username"}
                buttonValue={"Enter"}
                callback={props.callback}
            />
        </div>
    );
};
