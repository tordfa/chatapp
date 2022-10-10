import React, { useState } from "react";

function Chatmessage(props) {

    return (
        <div className='chat_message'>
            <p><b>{props.username}: </b>{props.message}</p>
        </div>
    )
}

export default Chatmessage;