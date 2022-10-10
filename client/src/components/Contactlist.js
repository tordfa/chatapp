
import React, { useState, useEffect } from 'react';

function Contactlist(props){

    const contacts = props.onlineUsers.map((user,index) => <li key={index}>{user}</li>)

    function logout(){
        props.logout();
        console.log("logout");
    }
    return(
        <div className='contact_list_container'>
            <button onClick={logout}>Logout</button>
            <ul className='contact_list'>
                <h2>Online users:</h2>
                {contacts.length ? contacts :  <span className="material-symbols-outlined loading">sync</span>} 
                             
            </ul>
        </div>
   )
}

export default Contactlist;