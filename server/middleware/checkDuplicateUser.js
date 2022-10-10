const { verify } = require('jsonwebtoken');
const User = require('../models/user.model')

checkDuplicateUser = (req,res,next) => {
    console.log("Verifying user...")
    User.findOne({
        username: req.query.user
    }).exec((err, user) => {
        if(err) {
            console.log("Erro verifying user.")
            res.status(500).send({message: err});
            return;
        }
        if (user) {
            console.log("Failed! Username is already in use!");
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
        next();
        
    })
}

module.exports = checkDuplicateUser;