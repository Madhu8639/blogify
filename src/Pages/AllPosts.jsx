import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard } from "../components"


const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{},[])
    appwriteService.getPosts([]).then((posts)=>{
        if (posts){
            setPosts(posts.documents)
        }
    })

  return (
    <div className='w-full py-8 flex justify-center items-center mx-auto  '>
    <Container>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' >
        {posts.map((post)=>(
            <div  key={post.$id}>
                
                <PostCard {...post} />
            </div>
        ))}
        </div>
    </Container>
    
    </div>
  )
}

export default AllPosts