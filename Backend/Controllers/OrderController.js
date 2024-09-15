import OrderModel from '../Models/OrderModel.js'
import UserModel from '../Models/UserModel.js'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = 'inr'
const deliveryCharges = 10;

export const PlaceOrder = async (req,res) => {
    try {
        const { userId , items , amount , address } = req.body;
        const orderData = {
            userId , items , amount , address , paymentMethods : "COD" , payment : false , date : Date.now()
        }
        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        await UserModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({ Success : true , Message : "Order Placed !" })
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}

export const PlaceOrderStripe = async (req,res) => {
    try {
        const { userId , items , amount , address } = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId , items , amount , address , paymentMethods : "Stripe" , payment : false , date : Date.now()
        }
        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data : {
                currency : currency,
                product_data : {
                    name : item.name
                },
                unit_amount : item.price * 100
            },
            quantity : 1
        }));

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name : 'Delivery Charges'
                },
                unit_amount : deliveryCharges * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment'
        });

        res.json({ Success : true , session_url : session.url })

    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}

export const VerifyStripe = async (req,res) => {
    const { userId , success , orderId } = req.body;
    try {
        if(success === 'true'){
            await OrderModel.findByIdAndUpdate(orderId, {payment:true});
            await UserModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({ Success : true });
        }else{
            await OrderModel.findByIdAndDelete(orderId);
            res.json({ Success : false });
        }
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}

export const PlaceOrderRazorpay = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}

// admin
export const AllOrders = async (req,res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({ Success : true , orders })
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}

// frontend for user
export const UserOrders = async (req,res) => {
    try {
        const { userId } = req.body
        const orders = await OrderModel.find({userId});
        res.json({ Success : true , orders });
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}

export const UpdateStatus = async (req,res) => {
    try {
        const { status , orderId } = req.body;
        await OrderModel.findByIdAndUpdate(orderId,{status});
        res.json({ Success : true , Message : "Status Updated !" });
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.Message });
    }
}