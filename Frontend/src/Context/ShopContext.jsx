import { createContext,  useEffect,  useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

export const ShopContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URI;

    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');
    const navigate = useNavigate()

    const AddToCart = async (itemId,size) => {
        if(!size){
            toast.error('Select Product Size !')
            return;
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})

            } catch (error) {
                console.log(error);
                toast.error(error.Message);
            }
        }
    }

    const GetCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.Message);
            }
        }
    }

    const GetCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/product/list');
            if(res.data.Success){
                setProducts(res.data.products);
            }else{
                toast.error(res.data.Message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message);
        }
    }

    const getUserCart = async (token) => {
        try {
            const res = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}});
            if(res.data.Success){
                setCartItems(res.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message);
        }
    }

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[token])

    useEffect(()=>{
        getProductsData()
    },[])

    const value = {
        products , currency , delivery_fee , search , setSearch , showSearch , setShowSearch , AddToCart , cartItems , GetCartCount , 
        updateQuantity , GetCartAmount , navigate , backendUrl , token , setToken , setCartItems
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}