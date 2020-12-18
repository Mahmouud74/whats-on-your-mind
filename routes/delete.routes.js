const deletee=require('express').Router();
const model = require('../models/user.model');
const postModel = require('../models/post.model');
deletee.get('/delete/:id',async(req,res)=>{
    await postModel.deleteOne({_id:req.params.id});
    res.redirect('/profile')
})
module.exports=deletee