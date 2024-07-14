import React, { useEffect, useState } from 'react'
import appwriteService  from "../appwrite/config"
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'
import LandingPage from './LandingPage'
const Home = () => {
    const loginStatus = useSelector(state => state.auth.status)
    console.log(loginStatus)
    const [posts, setPost] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if (posts){
                setPost(posts.documents)
            }
        })
    },[])
    console.log(posts.length)
    if (loginStatus==false){
        return (
            <Container>
                {/* <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts  
                        </h1>
                    </div>
                </div> */}
                <LandingPage/>
            </Container>
        )
    }
    // if (posts.length === 0){
    //     return (
    //         <Container>
    //             <div className='flex flex-wrap'>
    //                 <div className='p-2 w-full'>
    //                     <h1 className='text-2xl font-bold hover:text-gray-500'>
    //                         Login to read posts  
    //                     </h1>
    //                 </div>
    //             </div>
    //         </Container>
    //     )
    // }
    return (
        <div
        className='w-full py-8 flex justify-center items-center mx-auto '>
        <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {posts.map((post)=>(
                <div key={post.$id} >
                    <PostCard {...post}/>
                </div>
            ))}
            </div>
            </Container>
        </div>
    )
  
}

export default Home