import React,{useEffect, useState} from 'react'
import {Container, Post_form} from "../components"
import appwriteService from '../appwrite/config'
import {useNavigate, useParams} from 'react-router-dom' 

const EditPost = () => {
    const [posts,setposts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if (post){
                    setposts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[])

  return posts ? (<div className='py-8'>
  <Container>
    <Post_form post={posts}/>
  </Container>

  </div>) : null
}

export default EditPost