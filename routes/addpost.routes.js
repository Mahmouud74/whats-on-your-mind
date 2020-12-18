const addpost=require('express').Router()
const { findOne } = require('../models/post.model')
const model = require('../models/post.model')
addpost.post('/addpost',async(req,res)=>{
    const {title , content} = req.body
    await model.insertMany({title , content , userID : req.session.userID , uname:req.session.name})
    res.redirect('/home')
})
module.exports=addpost;