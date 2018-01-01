import React from "react";
import Chat from "./Chat";

export const ChatForm = (props) => {
    return (
        <div>
            <Chat
                content={""}
                buttonValue={"Send"}
                messages={props.messages}
                callback={props.callback}
                users={props.users}
            />
        </div>
    );
};
