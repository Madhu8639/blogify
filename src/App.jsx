import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {login,logout} from './store/authSlice'
import {Outlet} from 'react-router-dom'
function App() {
  const [loading,setloading] = useState(true) 
  const dispatch = useDispatch()
useEffect(()=>{
  authService.getCurrentUser()
            .then((userData) => {
              if (userData){
                dispatch(login({userData}))
              }
              else{
                dispatch(logout())
              }
            })
            .finally(()=>setloading(false))
},[])
 
  return !loading ? (
  <div >
  <div >
    <Header />
    <main>
    <Outlet />
    </main>
    {/* <Footer /> */}
  </div>
  </div>
  ): null
}

export default App
