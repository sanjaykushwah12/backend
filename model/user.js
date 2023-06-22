const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
 
  name :{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  mobile:{
    type:Number,
    required:true,
  
  },
  password:{
    type:String,
    required:true,
  },
  token:{
    type:String,
    default :''

  }

},{timestamps:true})



const UserModel = mongoose.model('User' , userSchema);
module.exports = UserModel;