import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { UserModel } from '../Models/UserModel.js';
import jwt from 'jsonwebtoken';

export const Token = (id) => {
    return jwt.sign({id},process.env.JWT);
}

export const Login = async (req,res) => {
    try {
        const { email , password } = req.body;
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.json({ Success : false , Message : "Email Does Not Exists !" });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = Token(user._id);
            res.json({ Success : true , token })
        }else{
            res.json({ Success : false , Message : 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ Message : "Error In SignUp" , Success : false });
    }
}

export const SignUp = async (req,res) => {
    const { name , email , password } = req.body;
    try {
        const exists = await UserModel.findOne({ email });
        if(exists){
            return res.json({ Success : false , Message : "Email Already Exists !" });
        }
        if(!validator.isEmail(email)){
            return res.json({ Success : false , Message : "Enter The Valid Email !" })
        }
        if(password.length < 5){
            return res.json({ Success : false , Message : "Enter The Minimum 5 Character Password !" })
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = new UserModel({
            name , email , password : hash
        });
        const user = await newUser.save();
        const token = await Token(user._id);
        res.json({ Success : true , token})
    } catch (error) {
        console.log(error);
        res.json({ Message : "Error In SignUp" , Success : false });
    }
}

export const AdminLogin = async (req,res) => {
    try {
        const { email , password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT);
            res.json({ Success : true , token });
        }else{
            res.json({ Success : false , Message : "Invalid Credentials !" });
        }
    } catch (error) {
        console.log(error);
        res.json({ Message : "Error In SignUp" , Success : false });
    }
}