import React,{useCallback, useRef} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select} from "../index"
import appwriteService from "../../appwrite/config"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import Rte from '../Rte'
import { Container } from 'postcss'

const Post_form = ({post}) => {
    const {register,handleSubmit, watch, 
        setValue, control, getValues} = useForm({
            defaultValues:{
                title:post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status:post?.status || 'active',
            },
        });
    const navigate = useNavigate()
    const userData = useSelector(state=>state.auth.userData)

    const submit = async (data) => {
        console.log(data.title);
        if (post){
           const file = data.image[0]? await appwriteService.uploadFile(data.image[0]):null
        if (file){
            appwriteService.deleteFile(post.featuredImage)
        }
        const dbPost = await appwriteService.updatePost(post.$id,{
            ...data,
            content: data.content,
            featuredImage:file?file.$id:undefined 
        })
        if (dbPost){
            navigate(`/post/${dbPost.$id}`)
        }
    }
        else{
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file){
                const fileId = file.$id ;
                data.featuredImage = fileId ;
                console.log(userData);
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId:userData.$id,
                });
                if (dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }
    const slugTransform = useCallback((value)=>{
        if (value && typeof value ==='string')
            return value 
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')
        return ''
        
    },[])

    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if (name==='title'){
                setValue('slug',slugTransform(value.title,
                {shouldValidate:true}))
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

  return (
    <div className=' bg-white my-10 rounded-2xl '>
    <form onSubmit={handleSubmit(submit)}>
        <div className='overflow-hidden ' >
            <div className='p-3 w-full'>
            <Input 
                label = ''
                placeholder = " Give a title"
                className="border-2 border-black mt-3  w-full leading-[3] rounded-2xl"
                {
                    ...register("title",{required:true})
                }
            />
            <Input 
                label = ""
                placeholder = " Slug"
                className = "border-2 border-black mt-3 w-full  leading-[3] rounded-2xl "
                {
                    ...register("slug",{required:true})
                }
                onInput = {(e)=>{
                    setValue("slug",slugTransform(e.currentTarget.value),{
                        shouldValidate:true
                    });
                }}
            />
            </div>
            <div className='m-7'>
            <Rte label="Content" name="content" 
                control = {control} defaultValue={getValues("content")}
            />
            </div>
        </div>
        <div className='p-6' >
        <div className='flex flex-col gap-3 sm:gap-0  md:flex-row justify-between '>
            <Input 
                label = "Featured Image :"
                type = "file"
                
                accept = "image/png, image/jpg, image/jpeg, image/gif"
                {
                    ...register("image",{
                        required:!post
                    })
                }
            />
            <Select 
            
            options = {['active','inactive']}
            label = "Status"
            {
                ...register("status", {
                    required:true
                })
            }
        />
        </div>
            {post && (
                <div className='my-2 sm:my-2' >
                    <img className='rounded-2xl' src={appwriteService.getFilePreview(post.featuredImage)}
                     alt={post.title}
                     />
                </div>
            )}
        
        
        <Button className='my-5 b rounded-2xl p-3 bg-blue-500 text-white' Children={post ? "Update" :"Submit"} type="submit" bgColor={post ? "bg-green-500" :undefined}
        />
        </div>    
        
    </form>
    </div>
  )
}

export default Post_form