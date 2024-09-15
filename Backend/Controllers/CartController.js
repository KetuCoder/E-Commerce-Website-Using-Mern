import mongoose from 'mongoose';
import { UserModel } from '../Models/UserModel.js'

export const AddToCart = async (req,res) => {
    try {
        const { userId , itemId , size } = req.body;
        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await UserModel.findByIdAndUpdate(userId,{cartData});

        res.json({ Success : true , Message : "Added To Cart !"})
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message})
    }
}

export const UpdateCart = async (req,res) => {
    try {
        const { quantity , sizes, itemId , userId } = req.body;
        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await UserModel.findByIdAndUpdate(userId,{cartData});
        res.json({ Success : true , Message : "Cart Updated !" });
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message})
    }
}

export const GetUserCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const userData = await UserModel.findById(userId);
        let cartData = userData.cartData;

        res.json({ Success : true , cartData : userData.cartData });
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message})
    }
}