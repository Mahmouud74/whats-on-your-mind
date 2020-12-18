const home=require('express').Router()
const postModel = require('../models/post.model')
const model = require('../models/user.model')
const signup = require('./signup.routes')
home.get('/home',async(req, res )=>{
    if(req.session.userID){
    const postData = await postModel.find({})
    const user = await model.findOne({_id:req.session.userID})
    
    //console.log(postData[0].userID);
    //console.log(postData[1].userID);
    res.render('home.ejs',{name:req.session.name , isLoggedIn: req.session.isLoggedIn , postData , user })
    }
    else
    {
        res.redirect('/signup')
    }
})

module.exports=home;