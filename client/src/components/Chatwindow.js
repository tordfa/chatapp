import React, { useState } from "react";

function Chatwindow(props) {
    const [msgState, setMsgState] = useState("");

    function handleMsgChange(event) {
        setMsgState(event.target.value)
    }

    function handleOnKeyDown(e) {
        if (e.code === "Enter") {
            props.sendMsg(msgState);
            setMsgState("");
        }
    }

    return (
        <div className='chatwindow'>
            <div className="chat_content">
                {props.messages}
            </div>
            <div className="chat_input">
                    <input type="text" value={msgState} onChange={handleMsgChange} onKeyDown={handleOnKeyDown}></input>
                    <button onClick={() => { props.sendMsg(msgState); setMsgState(""); }}>Send</button>
                </div>

            <div className="chat_footer"></div>
        </div>
    )
}

export default Chatwindow;