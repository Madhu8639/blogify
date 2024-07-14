import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error, setError] = useState("")
    const login  = async(data)=>{
        setError("")
        try{
            const session = await authService.login(data)
            if (session){
                const  userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        }
        catch(error){
            setError(error.message)
        }
    }
  return (
    <>
        <div className='bg-white rounded-md  my-[100px] md:w-[500px] sm:w-[350px] p-6 mx-auto  text-justify '>
            <div >
                <h1 className='text-center'>
                    LOGIN
                </h1>
                
                <form onSubmit={handleSubmit(login)} 
                >
                    <div className='space-y-5' >
                        <Input label="Email " 
                            placeholder="enter your email"
                            type="email"
                            className="block mx-auto w-full mt-2 h-10"
                            {...register("email",{
                                required:true,
                                validate:{
                                    matchPattern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)||"email address must be valid address",
                                }
                            })}
                        />
                        <Input label="Password "
                        placeholder="Enter Password"
                        className="block mx-auto w-full mt-2 h-10"
                        type="password"
                        {...register("password",{
                            required:true,
                        })} />
                        <div className='flex  justify-end'>
                        
                        <p >
                Don&apos;thave any account?&nbsp;
                <Link to = "/signup" className='font-medium
                text-primary transition-all duration-200 
                haver:underline' >
                Sign Up
                </Link>
                </p>
                {error&& <p >
                {error}</p>}
                        </div>
                        <div className='  w-full flex  justify-center'>
                        <Button 
                        className='text-white bg-custom-blue  w-full h-[45px] rounded-2xl'
                        Children="Sign In"
                        type="submit"
                        />
                        </div>
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login