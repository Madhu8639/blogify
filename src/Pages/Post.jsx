import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { TypeAnimation } from 'react-type-animation';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8  bg-white my-[70px] rounded-2xl">
            <Container>
                <div className="w-full flex flex-col mb-4 relative border rounded-xl p-1">

                <div className="w-full  ">
                    <TypeAnimation
                                    sequence={[
                                        // Same substring at the start will only be typed out once, initially
                                        post.title,
                                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                                        post.title,
                                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                                        
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    style={{  display: 'inline-block' }}
                                    repeat={Infinity}
                                    className="text-[20px]  sm:text-2xl  mt-[100px] font-bold "
                                    />
                    {/* <h1 >{post.title}</h1> */}
                </div>

                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl  w-full object-fit mt-4"
                    />
                    

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button Children={'Edit'}  className="mr-3 h-[35px] bg-custom-blue pl-4 pr-4 rounded " />        
                            </Link>
                            <Button Children={'Delete'} className="h-[35px] bg-custom-blue pl-4 pr-4 rounded" onClick={deletePost}/>
                                
                            
                        </div>
                    )}
                </div>
                
                <div className="browser-css p-10">
                   <p>
                   {parse(post.content)}
                   </p>
                    
                    </div>
            </Container>
        </div>
    ) : <h1>No posts to show yet</h1>;
}