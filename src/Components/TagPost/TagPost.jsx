import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import SectionTitle from "../SectionTitle";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";


const TagPost = () => {
    const axiosPublic = useAxiosPublic()
    const [newTag, setNewTag] = useState('Programming');

    //   All tags-----------------------------------start
    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tag`);
            return res.data
        }
    })

    //   All tags-----------------------------------end
    const handleSetTag = (tag) => {
        setNewTag(tag)
        console.log(newTag);
        refetch()
    }

    const { data: tagPost = [], refetch } = useQuery({
        queryKey: ['tagPosts'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tags/${newTag}`);
            return res.data
        }
    })


    console.log(tagPost);

    return (
        <div>
            <SectionTitle heading={'easy to find'} subHeading={'search by tag'}></SectionTitle>
            {/* <h1>{tagPost.length}  || {tags.length}</h1> */}
            <div className="container mx-auto space-x-3 lg:pl-8 text-center flex lg:flex-row flex-col items-center justify-center ">
                {
                    tags.map(tag => <button onClick={() => handleSetTag(tag.label)} key={tag._id} className={tag.label === newTag ? "btn btn-wide rounded-full  text-[#6489f5]" : "btn btn-wide rounded-full text-[#080909]"}>{tag.label}</button>)
                }
            </div>

            <div className="grid lg:grid-cols-2 items-center justify-center container mx-auto p-10 gap-6"> 
                {
                    tagPost.map(post => <div key={post._id} className="card lg:w-[70vh] w-[320px] bg-base-100 shadow-xl">

                        <div className="card-body">
                          <div className="lg:flex justify-between">
                          <div className="avatar">
                                <div className="w-20 rounded-full">
                                    <img src={post.authorImage} />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mr-3">
                                <p className="flex items-center gap-1"> <FaEnvelope />{post.comment}</p>
                                <p className="flex items-center gap-1"> <AiOutlineLike />{post.upVote}</p>
                                <p className="flex items-center gap-1"> <AiTwotoneDislike />{post.downVote}</p>
                                <p className="flex items-center gap-1"> #{post.tag}</p>
                            </div>
                          </div>
    
                            <h2 className="card-title">{post.postTitle}</h2>
                            <p>{post.postDescription.length > 40 ? `${post.postDescription.slice(0, 150)}...more` : post.postDescription}</p>
                            <div className="card-actions justify-end">
                            <Link to={`/details/${post._id}`} className="mt-6"><a href="#_" className="relative inline-block text-lg group">
                                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                        <span className="absolute left-0 w-48 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                        <span className="relative">View Details</span>
                                    </span>
                                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                </a></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TagPost;
