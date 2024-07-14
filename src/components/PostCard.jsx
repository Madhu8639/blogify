import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import { reactHooksModule } from '@reduxjs/toolkit/query/react'

const PostCard = ({$id, title,featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
    <div className='h-full bg-white max-w-sm rounded-2xl shadow-2xl  overflow-hidden flex flex-col items-center blureffect'> 
        <img className='h-[192px] w-[300px] rounded-2xl object-cover p-3'  src={appwriteService.getFilePreview(featuredImage)} alt={title} />
    <div className='p-3  text-xl font-bold '>
    <h2 className=''>{title}</h2>
    </div>
</div>

    </Link>
  )
}

export default PostCard
