const subscribe = (req, res,activeSubs) => {
    activeSubs.push({id: req.userId , username: req.query.username, response: res})
    req.on('close', () => {
      console.log("Request closed");
      activeSubs.forEach((element,index) => {
        if(element.response == res){
          activeSubs.splice(index,1);
        }
      })
    })
}

const publish = (req, res,activeSubs) => {
  activeSubs.forEach(element => {
    element.response.send({username: req.body.username, message: req.body.message})
  })
}

module.exports = {
    subscribe,
    publish
};
