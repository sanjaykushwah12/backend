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
    maxlength:[10 ,'valid mobile No.'],
    minlength:[10]
  },
  password:{
    type:String,
    required:true
  }

},{timestamps:true})



const UserModel = mongoose.model('User' , userSchema);
module.exports = UserModel;