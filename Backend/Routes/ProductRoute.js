import express from "express";
import { AddProduct , SingleProduct , ListProduct , RemoveProduct } from "../Controllers/ProductController.js";
import { upload } from "../Middelware/Multer.js";
import { AdminAuth } from "../Middelware/AdminAuth.js";

export const ProductRouter = express.Router();

ProductRouter.post('/add',AdminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),AddProduct);
ProductRouter.get('/list',ListProduct);
ProductRouter.post('/remove',AdminAuth,RemoveProduct);
ProductRouter.post('/single',SingleProduct);