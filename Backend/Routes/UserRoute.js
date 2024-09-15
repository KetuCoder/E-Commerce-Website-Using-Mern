import express from "express";
import { Login , AdminLogin , SignUp } from "../Controllers/UserController.js";

export const userrouter = express.Router();

userrouter.post('/login',Login);
userrouter.post('/signup',SignUp);
userrouter.post('/admin',AdminLogin);