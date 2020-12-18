const signin=require('express').Router()
const bcrypt = require('bcrypt');
const model = require('../models/user.model')
signin.get('/signin',(req,res)=>{
    //console.log(req.flash('invalidPass')[0]);
    let loggedIn = req.flash('loggedIn')[0]
    if(loggedIn==undefined)
    {
        loggedIn = true
    }
    let pass=req.flash('invalidPass')[0]
    console.log(pass);
    //console.log(pass);
    if(pass==undefined){
        pass=true;
    }
    //console.log(pass);
    let mail=req.flash('invalidMail')[0];
    if (mail==undefined){
        mail=true;
    }
    res.render('signin.ejs',{pass, mail,loggedIn });
})
signin.post('/handlesignin',async(req,res)=>{
  const  {email , password } = req.body;
  const  user = await model.findOne({email});
   if(user!=null){
    const match = await bcrypt.compare(password, user.password);
    if(match){
        req.session.userID=user._id;
        req.session.name = user.uname;
        req.session.isLoggedIn=true;
        var hour = 36000000 * 50
        req.session.cookie.maxAge = hour
        req.flash('id',user._id)
        res.redirect('/home')
    }
    else{
        isLoggedIn=[{status:false}]
        req.flash('loggedIn',isLoggedIn)
        isPass =[{ status: false}]
        req.flash('invalidPass',isPass)
        res.redirect('/signin');
    }
   }
   else
   {   
        isLoggedIn=[{status:false}]
        req.flash('loggedIn',isLoggedIn)
        isMail = [{status:false}]
       req.flash('invalidMail',isMail);
       res.redirect('/signin')
   }
})
module.exports=signin;