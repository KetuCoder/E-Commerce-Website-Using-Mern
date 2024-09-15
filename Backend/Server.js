import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import 'dotenv/config';
import ConnectCloudinary from './Config/Cloudniary.js'
import { userrouter } from './Routes/UserRoute.js';
import { ProductRouter } from './Routes/ProductRoute.js';
import { CartRouter } from './Routes/CartRoute.js';
import { OrderRouter } from './Routes/OrderRoute.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(cookie());
app.use(express.json());

ConnectCloudinary();
try {
    mongoose.connect(process.env.MONGO);
    console.log('Connected To Database !')
} catch (error) {
    console.log(error);
}

app.use('/api/user',userrouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',CartRouter);
app.use('/api/order',OrderRouter);


app.listen(port,()=>{
    console.log(`Server ${port}`)
});