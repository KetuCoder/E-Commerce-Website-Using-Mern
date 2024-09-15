import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {

  const [currentState,setCurrentState] = useState('Login');
  const { token , setToken , navigate , backendUrl } = useContext(ShopContext);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const OnSubmit = async (e) => {
    e.preventDefault();
    try {
      if(currentState === 'Sign Up'){
          const res = await axios.post(backendUrl + '/api/user/signup',{name,email,password});
          if(res.data.Success){
            setToken(res.data.token);
            localStorage.setItem('token',res.data.token)
          }else{
            toast.error(res.data.Message);
          }
      }else{
        const res = await axios.post(backendUrl + '/api/user/login',{email,password});
        if(res.data.Success){
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token)
        }else{
          toast.error(res.data.Message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.Message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={OnSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
        </div>
        {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Your Name ...' required /> }
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Your Email ...' required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Your Password ...' required />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className='cursor-pointer'>Forgot Your Password ?</p>
            {
              currentState === "Login" ? <p onClick={()=>setCurrentState("Sign Up")} className='cursor-pointer'>Create An Account </p> : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}
