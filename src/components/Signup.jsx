import React,{useState} from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {login} from '../store/authSlice'
import {Button,Input,Logo} from "./index"
import {useForm} from 'react-hook-form'

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error, setError] = useState("")
const create = async(data)=>{
    setError("")
    try{
        const userData = await authService.createAccount(data)
        if (userData){
            const useData = await authService.getCurrentUser()
            if (userData) dispatch(login(userData))
            navigate('/')
        }
    }
    catch (error){
setError(error.message)
    }
}
  return (
    <div >
        <div > 
         <div className='bg-white rounded-md  my-[100px] md:w-[500px] sm:w-[350px] p-6 mx-auto  text-justify '>
         <h1 className="flex justify-center" >Sign up to create account
         </h1>
         {error && <p>{error}</p>}
         <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5 my-3'>
                <Input 
                label ="Full-Name: "
                className="block mx-auto w-full mt-2 h-10"
                placeholder = "Enter your full name"
                {...register("name",{
                    required:true,
                })}
                 />
                 <Input label="Email: " 
                            placeholder="enter your email"
                            className="block mx-auto w-full mt-2 h-10"
                            type="email"
                            {...register("email",{
                                required:true,
                                validate:{
                                    matchPattern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)||"email address must be valid address",
                                }
                            })}
                        />
                <Input lable="Password: "
                type=  "password"
                className="block mx-auto w-full mt-2 h-10"
                placeholder = "enter your password"
                {...register('password',{
                    required:true,
                })}
                />
                <Button className='text-white bg-custom-blue  w-full h-[45px] rounded-2xl' type="submit"
                  Children={'Create Account'}/>
            </div>
            <p className="my-3">
            Already have an account?&nbsp;
            <Link to="/login" > Sign In</Link>
         </p>
         </form>
         </div>
        </div>

    </div>
    
  )
}

export default Signup