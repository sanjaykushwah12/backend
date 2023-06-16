const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static userreg = async (req, res) => {
    try {
      const { name, email, mobile, password, confirm_password } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user);
      if (user) {
        res.status(200).send({success:false, message:"Email is already exist"});
      } else {
        if (name && email && mobile && password && confirm_password) {
          if (password == confirm_password) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const data = new UserModel({
                name: name,
                email: email,
                mobile: mobile,
                password: hashpassword,
              });
              await data.save();
              res.status(201).json({
                success: true,
                message: "Registration Successfully",
                data,
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            res.status(200).send({success:false, message:"Password and Confirm Password does not match?"});
          }
        } else {
          res.status(200).send({success:false, message:"All Field are required"});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static userinfo = async (req, res) => {
    const data = await UserModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  };

  static user_verify = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const pwdmatch = await bcrypt.compare(password, user.password);
          if (pwdmatch) {
            const token = jwt.sign({ id: user._id }, "sanjaykushwah2023");
            //  console.log(token)

            res.status(200).send({success:true,message:"Login Successfully"});
            
          } else {
            
            res.status(200).send({success:false, message:"Email and Password are Invalid"});
          }
        } else {
        
          res.status(200).send({success:false, message:"You are not Registered"});
        }
      } else {
        res.status(200).send({success:false, message:"All Field are required"});
      }
    } catch (error) {
      console.log(error);
    }
  };

  static pwd_update = async(req,res) =>{
    try {
      const {user_id, password} =req.body;
      const User = await UserModel.findOne({_id :user_id})
      if(User){
        const newpassword = await bcrypt.hash(password, 10);

        const data =await  UserModel.findByIdAndUpdate({_id:user_id},{$set:{
          password :newpassword,
          
        }})
        res.status(200).send({success:true, message:'Password Update Successfully'})

      }else{
        res.status(200).send({success:false, message:'Invalid Credentials'})
      }
    } catch (error) {
      console.log(error)
    }
    
  }

}
module.exports = UserController;

//token = id + secret key
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFkNjA0MGRjOTZiOTRiMzZmOGU5ZSIsImlhdCI6MTY4NjgyMzc2N30.BYzAqQZgj6ZfRnEqgVgBPCenilXco0-ta28U_d-zSW0
