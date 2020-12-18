const profile=require('express').Router()
const model = require('../models/user.model');
const postModel= require('../models/post.model')
profile.get('/profile',async (req,res)=>{
    if(req.session.userID){
        const postData = await postModel.find({userID:req.session.userID})
        const user = await model.findOne({_id:req.session.userID})
        res.render('profile.ejs',{postData , user});
    }
        else
        {
            res.redirect('/signup')
        }
    })


module.exports=profile;