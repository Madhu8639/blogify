import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'
import Logout from './Logout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },

  ]
  console.log({authStatus});
  return (
    <header >
      <Container>
        <nav className="h-20 bg-white rounded   
         flex  justify-between  items-center p-3 shadow-black shadow-2xl">
          <div >
          <Link to='/'>
          <Logo />
          </Link>
          </div>
          <div>
          <div  className={`bg-white absolute top-[100px] right-[3px] 
           w-[100px] rounded gap-6 flex flex-col items-center  text-lg font-semibold  
           z-10 ${isMenuOpen ? 'block' : 'hidden'}  lg:block 
           lg:static  mr-4`}>
          <ul className="  flex lg:gap-14 flex-col items-center  lg:flex-row justify-end" >
            {navItems.map((item) =>item.active?(
              <li className=''  key = {item.name}>
                <button className='lg:w-[100px]'
                onClick={()=>{navigate(item.slug)}}
                >
                {item.name}
                </button>
              </li>
            ):null)}
            {authStatus && (<li ><Logout /></li>)}
          </ul>
          </div>
          </div>
          <div className=' cursor-pointer lg:hidden'>
        <FontAwesomeIcon icon={faBars} size='2x' onClick={toggleMenu}/>
        </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header