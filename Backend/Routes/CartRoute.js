import express from 'express';
import { AddToCart, GetUserCart, UpdateCart } from '../Controllers/CartController.js';
import { AuthUser } from '../Middelware/Auth.js';

export const CartRouter = express.Router();

CartRouter.post('/add',AuthUser,AddToCart);
CartRouter.post('/get',AuthUser,GetUserCart);
CartRouter.post('/update',AuthUser,UpdateCart)