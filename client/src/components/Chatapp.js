import Chatwindow from "./Chatwindow";
import Chatmessage from "./Chatmessage";
import Contactlist from "./Contactlist";

import React, {useState, useEffect, useRef} from "react";

function Chatapp(props){
    const [messagesState, setMessagesState] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const mounted = useRef(false);
    
    const pollurl = "/api/pollmsg?username="+props.username;
    useEffect(()=>{
        mounted.current = true;
        fetchTimeout(pollurl,10000) 

        return () => {mounted.current=false}
    },[])

    async function fetchTimeout(url,timems){
        if(mounted.current){
            console.log("fetching.....")
            const controller = new AbortController();
            const signal = controller.signal
            const timeout = setTimeout(() => {
                console.log("Fetch was aborted.");
                controller.abort()
                fetchTimeout(url,timems)
            }, timems)
            await fetch(url,{signal})
                .then((response) => response.json())
                .then((data) => {
                    if(data.message){
                        var newKey = messagesState.length + 1;
                        var newMessage = <Chatmessage username={data.username} message={data.message} key={newKey}></Chatmessage>
                        setMessagesState(current => [...current, newMessage])
                    }
                    if(data.onlineUsers){
                        console.log("Online users: " + data.onlineUsers)
                        setOnlineUsers(data.onlineUsers)
                    }
    
                    console.log("Response received")
                    clearTimeout(timeout);
                    fetchTimeout(url,timems)
                })
        }
    }

    async function sendMsg(msg){
        var message = {username: props.username, message: msg}
        fetch('/api/sendmsg', {headers: {'Content-Type': 'application/json'},credentials: 'include', method: 'POST' , mode: 'cors', body: JSON.stringify(message)})
    }

    return(
    <>  
        <Contactlist onlineUsers={onlineUsers} logout={props.logout}></Contactlist>
        <Chatwindow sendMsg={sendMsg} messages={messagesState}></Chatwindow>
        <div className='contact_list_container'></div>
    </>

   )
}

export default Chatapp;