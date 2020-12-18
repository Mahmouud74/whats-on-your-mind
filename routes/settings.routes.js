const settings = require('express').Router();
const model = require('../models/user.model');
const bcrypt = require('bcrypt');
const {check , validationResult} = require('express-validator');
settings.get('/settings',async(req,res)=>{
    const user = await model.findOne({_id:req.session.userID})
    let errors = req.flash('validate');
    let oldPass= req.flash('notOld')[0];
    if(oldPass == undefined){
        oldPass = true;
    }
    console.log(oldPass);
     res.render('acount_setting.ejs',{errors , oldPass , user})
})
settings.post('/handlepass',check('neww').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
check('retype').custom((value, { req }) => {
    if (value !== req.body.neww) {
        return false
    }
    return true;
}) , async (req,res)=> {
    const {old , neww , retype  } = req.body 
    const errors = validationResult(req);
    console.log(errors.array());
    const verify = await model.findOne({_id : req.session.userID});
    const match = await bcrypt.compare(old, verify.password);
    if(match){
        if(errors.isEmpty()){
            bcrypt.hash(neww , 7 , async(err, hash)=> {
                await model.updateOne({_id : req.session.userID },{$set : {password : hash } }) 
                res.redirect('/home');
            });
        }
        else {
            req.flash('validate', errors.array());
            res.redirect('/settings');
        }
    }
    else{
        let old = [{status:match}]
        req.flash('notOld',old);
        res.redirect('/settings');
    }

} )
module.exports=settings;
