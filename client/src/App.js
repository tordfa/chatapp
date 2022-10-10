import './App.css';
import Chatapp from './components/Chatapp'
import Login from './components/Login';

import React, {useState} from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameState, setUserNameState] = useState() 

  function login(username,password){
    fetch(`/api/signin/?username=${username}&password=${password}`, {credentials: 'include', method: 'POST', mode: 'cors'})
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.isLoggedIn){
          setIsLoggedIn(true)
          setUserNameState(username)
        }
      })
  }

  function loginGuest(){
    fetch(`/api/signinguest`, {credentials: 'include', method: 'POST', mode: 'cors'})
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.isLoggedIn){
        setIsLoggedIn(true)
        setUserNameState(data.username)
      }
    })
  }

  function logout(){
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      {isLoggedIn ? <Chatapp username={usernameState} logout={logout}></Chatapp> : <Login login={login} loginGuest={loginGuest}></Login> }
    </div>
  );
}

export default App;
