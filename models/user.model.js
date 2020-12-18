const mongoose = require('mongoose');
schema = mongoose.Schema({fname:String , lname:String , uname :String , email:String , password : String })
module.exports = mongoose.model('user' ,schema);
