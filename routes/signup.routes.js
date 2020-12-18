const signup=require('express').Router()
const model=require('../models/user.model');
const {check , validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
signup.get('/signup',(req , res )=>{
    let oldInputs = req.flash('oldInputs')[0];
    if(oldInputs==undefined){
        oldInputs = {fname:'',lname:'',uname:'',email:'',password:'',rePassword:''}
    }
    let exisst = req.flash('Key1')[0];
    let errors = req.flash('Key2')
    //console.log(errors);
    res.render('registration.ejs',{ errors ,exisst ,oldInputs })
    
})


signup.post('/handlesignup',check('fname').matches(/[A-Z][a-z]*/),
check('lname').matches(/[A-Z][a-z]*/),
check('email').isEmail(),
check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
check('rePassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        return false
    }
    return true;
})
,async (req,res)=>{
const {fname , lname , uname , email , password , rePassword} = req.body
const errors = validationResult(req);
console.log(errors.array());
if(errors.isEmpty())
{ const user = await model.findOne({email}) ;
    if(user == null){ 
            bcrypt.hash(password, 7 , async(err, hash)=> {
                await model.insertMany({fname , lname , uname , email , password : hash});
                res.redirect('/signin');
            });
        
    }
    else
    {
        exist = [{params : 'exists'}];
        //console.log((exist[0]));
        req.flash('Key1',exist);
        res.redirect('/signup')
    }
}
else {
    req.flash('Key2',errors.array())
    res.redirect('/signup')
    }
    req.flash('oldInputs',req.body);

})

module.exports=signup;