import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
// import validator from "validator";
import { validator } from "sequelize/lib/utils/validator-extras";
import Sequelize from 'sequelize';
const Sequelize = require('sequelize');



const loginUser = async (req,res) => { 
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"User does not exist"})
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            res.json({success:false,message:"Enter a valid Password"})
        }
        
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in login"})
        
    }
} 
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser = async(req,res)=>{
    
    const {name,password,email} = req.body
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exist!!!"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Enter a Strong Password"})
        }

        const salt  = await bcrypt.genSalt(10)
        const hasPass = await bcrypt.hash(password,salt)

        const newUser  = new userModel({
            name:name,
            email:email,
            password:hasPass
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in adding user"})
    }
}

export {loginUser,registerUser} 