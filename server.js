const port = 3000;
const express = require('express');
const path = require('path');
const app=express();
const mongoose = require('mongoose');
const session = require('express-session')

var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb+srv://admin:admin@cluster0.vk4zz.mongodb.net/examDB',
    collection: 'mySessions'
  });
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
}))
const flash=require('connect-flash')
app.use(flash());
const signin=require('./routes/signin.routes')
const signup=require('./routes/signup.routes')
const profile=require('./routes/profile.routes')
const home = require('./routes/home.routes');
const logout=require('./routes/logout.routes')
const addpost=require('./routes/addpost.routes')
const settings = require('./routes/settings.routes')
const edit=require('./routes/edit.routes')
const deletee=require('./routes/delete.routes')
const root = require('./routes/root.routes');
app.use(express.static(path.join(__dirname,'public')));
app.set('view-engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(home)
app.use(signin);
app.use(signup);
app.use(profile);
app.use(logout)
app.use(addpost)
app.use(settings)
app.use(edit);
app.use(deletee)
app.use(root);
//app.set('views',path.join(__dirname,'views'))
mongoose.connect('mongodb+srv://admin:admin@cluster0.vk4zz.mongodb.net/examDB', { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(process.env.PORT ||3000,()=>{
    console.log(' bsm ellah , Exam');
})
