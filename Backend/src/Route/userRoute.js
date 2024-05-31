const express =require("express");
const {  signUp, login, logout } = require("../Controller/users.Controller");


const UserRouter =express.Router();




UserRouter.post("/register",signUp);

UserRouter.post("/login",login);

UserRouter.get("/logout",logout)

module.exports={UserRouter};