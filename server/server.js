require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

const {signup, signin, signinguest, logout} = require('./controller/authController')
const {subscribe,publish} = require('./controller/pubsubController')
const checkDuplicateUser = require('./middleware/checkDuplicateUser')
const verifyToken = require('./middleware/verifyToken')

const mongoose = require('mongoose');

const port = process.env.PORT;
const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log("DB Connected")

  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  })

app.use(cors(({ credentials: true})))
app.use(cookieParser());
app.use(express.json())
app.use(express.static("../client/build"))

app.listen(port, () => {
  console.log("Server running at port: " + port)
})

app.get('/',(req,res) => {
  console.log("GET REQUEST")
})

app.post('/api/signup',[checkDuplicateUser],(req,res) => {
  console.log("Signing up new user: ")
  console.log("New User. Username: " + req.query.user)
  console.log("Password: " + req.query.password)
  signup(req,res);
})

app.post('/api/signinguest',(req,res) => {
  signinguest(req,res);
  sendUserInfo(activeSubscribers)
})


// ADD MIDDlEWARE CHECKING FOR ATTACKS?
app.post('/api/signin',(req,res) => {
  signin(req,res);
  sendUserInfo(activeSubscribers)

})

app.post('/api/logout',[verifyToken],(req,res) => {
  logout(req,res)
})

app.post('/api/checklogin',[verifyToken],(req,res) => {
  res.status(200).send({ message: "Authorized!" , isLoggedIn: true})
})

var activeSubscribers = [];
const userUpdate = setInterval(() => {sendUserInfo(activeSubscribers)},8000)

app.post('/api/sendmsg',[verifyToken],(req,res) => {
  console.log(req.body.message)
  res.status(200).send({ message: "Authorized!" , isLoggedIn: true})
  publish(req,res,activeSubscribers)
})

app.get('/api/pollmsg',[],(req,res) => {
  console.log("Polling message");
  subscribe(req,res,activeSubscribers);

})

function sendUserInfo(activeSubscribers){
  var usernames = {onlineUsers: []}
  activeSubscribers.forEach((element) => {
    usernames.onlineUsers.push(element.username)
  })
  activeSubscribers.forEach((element) => {
    element.response.send(usernames)
  })
}

