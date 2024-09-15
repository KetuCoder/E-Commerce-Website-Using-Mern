import express from 'express';
import { AllOrders, PlaceOrder, PlaceOrderRazorpay, PlaceOrderStripe, UpdateStatus, UserOrders, VerifyStripe } from '../Controllers/OrderController.js';
import { AdminAuth } from "../Middelware/AdminAuth.js";
import { AuthUser } from '../Middelware/Auth.js';

export const OrderRouter = express.Router();

// admin
OrderRouter.post('/list',AdminAuth,AllOrders)
OrderRouter.post('/status',AdminAuth,UpdateStatus)


// payment orders
OrderRouter.post('/place',AuthUser,PlaceOrder);
OrderRouter.post('/stripe',AuthUser,PlaceOrderStripe);
OrderRouter.post('/razorpay',AuthUser,PlaceOrderRazorpay);

// user feature
OrderRouter.post('/userorders',AuthUser,UserOrders);

// verify payment
OrderRouter.post('/verifystripe',AuthUser,VerifyStripe)