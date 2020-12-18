const mongoose=require('mongoose');
schema = mongoose.Schema({title:String , content:String , uname:String ,userID : {type : mongoose.Schema.Types.ObjectId , ref : 'user'} });
module.exports=mongoose.model('post',schema);
