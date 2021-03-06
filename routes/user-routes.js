var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');

var authClass = require('./../auth');
var auth = authClass();
var uuid = require('uuid');

class UserRoutes{
  constructor(userService){
    this.userService = userService;
  }
  
  router(){
    let router = express.Router();
    router.get('/profile',auth.authenticate(), this.get.bind(this));
    router.post('/signup',this.post.bind(this));
    router.delete('/:id',this.delete.bind(this));
    router.put('/:id',this.update.bind(this));
    return router;
  }

  get(req,res){
    // console.log("user: ", req.user);
    return this.userService.retrieve(req.user)
      .then((user)=>res.json(user))
      .catch((err)=>res.status(500).json(err))
  }

  post(req,res){
    let userInfo = {
      userId: uuid(),
      firstName: req.body.user.firstname,
      lastName: req.body.user.lastname,
      password: req.body.user.password,
      email: req.body.user.email,
      shippingAddress: '',
      billingAddress: ''
    };
    // console.log(userInfo);

    //check if the email exist or not
    return this.userService.auth(req.body.user.email).then((user) =>{
      if (user) {
        res.status(400).send('Email Already Exist');
      } else {
        this.userService.register(userInfo)
        .then((user)=>{
          console.log(user);
          var payload = {
            id: user.dataValues.id
          };
          var token = jwt.encode(payload, config.jwtSecret);
          res.json({
            token: token
          });
        }).catch((err)=>{
          console.log(err);
        })
      }
    });
      
  }

  update(req,res){
    return this.userService.edit(req.params.id,req.body)
      .then((result)=>{
        res.send(result);
      })
      .catch((err)=>res.status(500).json(err))
  }

  delete(req,res){
    return this.userService.deregister(req.params.id)
      .then(()=>{
        res.send('Deregistration Completed')
      })
      .catch((err)=>{res.status(500).json(err)})
  }

}
module.exports = UserRoutes;
