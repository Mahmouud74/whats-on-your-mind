const root = require('express').Router();
root.get('/',(req,res)=>{
  res.redirect('/signup');
})
module.exports=root;
