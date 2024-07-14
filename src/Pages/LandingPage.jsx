import React from 'react'
import Button from '../components/Button'
import Logout from '../components/Header/Logout'
import {Link,useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const handleclick = ()=>{
    navigate("/login");
  }
  return (
    <div className="relative bg-hero-pattern bg-cover rounded-xl h-[620px] my-[30px] shadow-black shadow-md overflow-hidden">
    
  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
  
  
  <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
    <h1 class="text-white text-4xl font-bold mb-4">
      Login to create a Blog
    </h1>
    <button onClick={()=>handleclick()} 
    class="px-4 py-2 bg-blue-500  h-[50px] w-[110px] rounded-[50px]  text-white">
      Login
    </button>
  </div>
</div>
  )
}

export default LandingPage