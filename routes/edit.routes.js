const edit=require('express').Router();
const postModel=require('../models/post.model');
const model=require('../models/user.model')
edit.get('/edit/:id',async(req,res)=>{
    const data = await postModel.findOne({_id:req.params.id})
    const user = await model.findOne({_id:req.session.userID})
    res.render('update.ejs',{user,data});
})
edit.post('/handleedit/:id',async(req,res)=>{
    const {title , content} = req.body
    await postModel.updateOne({_id : req.params.id },{$set : {title , content } }) 
    res.redirect('/profile');
})
module.exports=edit;