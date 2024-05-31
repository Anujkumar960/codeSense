require("dotenv").config();
const { Op, Error } = require("sequelize");

const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken");

const { blacklistModel } = require("../Schema/blacklist.model");
const { User } = require("../Schema/user.schema");


const signUp = async (req, res) => {
  const { username, email, preferred_languages, role, city, password } = req.body; // Adjusted destructuring
  try {
      const checkUser = await User.findOne({ where: { email } });
      console.log(checkUser);
      if (checkUser) {
          return res.status(401).json({ msg: "User is already registered. Try to login." });
      }
       const allUsers = await User.findAll();
       allUsers.sort((a, b) => b.user_id - a.user_id);
       const lastUserId = allUsers.length > 0 ? allUsers[0].id : 0;
       const newUserId = lastUserId + 1;
       let role_id=0;
       if(role=="user"){
        role_id=1;
       }else{
        role_id=2;
       }
       bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) throw new Error(err.message);
          try {
              const user = await User.create({ 
                  user_id:newUserId,
                  username,
                  email,
                  preferred_languages, 
                  role_id,
                  city,
                  password: hashedPassword 
              });
              return res.status(201).json({ message: "User registered successfully." });
          } catch (error) {
              console.error(error);
              return res.status(500).json({ error: true, msg: error.message });
          }
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, msg: error.message });
  }
};


const login=async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email)
    const person = await User.findOne({ where: {email}});
    if (!person) {
      return res
        .status(401)
        .json({ error: true, isAuth: false, msg: "User is not found" });
    }
    bcrypt.compare(password,person.password,(err,result)=>{
       if(err) throw new Error(err.message);
       if(result){
         console.log(person);
         const accessToken=jwt.sign({id:person.user_id,email:person.email},process.env.SECRET_KEY,{expiresIn:"1h"});
         const refreshToken=jwt.sign({id:person.user_id,email:person.email},process.env.SECRET_KEY,{expiresIn:"7d"});
         let isAdmin=false;
         if(person.role_id==2){
          isAdmin=true;
         }
         return res.json({msg:"user login successfully",accessToken,refreshToken,isAdmin});
       }else{
         return res.status(401).json({msg:"login details are not correct"});
       }
    })
   
    //res.status(200).json({ error: false, isAuth: true, data: person });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: true, isAuth: false, msg: "Internal server Error" });
  }
}

const logout=async(req,res)=>{
  const header=req.headers["authorization"]
  const token=header.split(" ")[1];
  try{
     if(!token){
        res.status(401).send("token not provided");
     }
     const userToken= new blacklistModel({token});
     await userToken.save();
     return res.status(201).send("user logout successfully");
  }catch(err){
    res.status(400).json({msg:err.message});
  }
}




module.exports={signUp,login,logout}


