import { Helmet } from "react-helmet-async";
// import Banner from "../../../Components/Banner";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import SectionTitle from "../../../Components/SectionTitle";
import { Link } from "react-router-dom";
import useAnnouncement from "../../../Hooks/useAnnouncement";
import { useQuery } from "@tanstack/react-query";
import TagPost from "../../../Components/TagPost/TagPost";


const Home = () => {
    const axiosPublic = useAxiosPublic()
    // const [allPost, setAllPost] = useState([])
    const [announcements] = useAnnouncement()

    // Search Section ---------------->start
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = e => {
        e.preventDefault();
        // Here you can perform any action with the searchInput state
        console.log(searchInput);
        refetch()

    }

    const { data: AllPosts = [], refetch } = useQuery({
        queryKey: ['AllPosts'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/search/${searchInput}`);
            return res.data
        }
    })
    console.log(AllPosts);


    const resetSearchInput = () => {
        setSearchInput('');
    };
    // Search Section ---------------->End


    return (
        <div>

            <Helmet>
                <title>
                    Forumify | Home
                </title>
            </Helmet>
            {/* <Banner /> */}
            <div className="lg:w-full ">

                <div className="hero lg:min-h-[50vh] lg:w-full  " style={{ backgroundImage: 'url(https://i.ibb.co/rQRQgxH/group-people-sit-chairs-one-them-is-wearing-striped-sweater.jpg)' }}>
                    <div className="hero-overlay bg-opacity-80"></div>
                    <div className="hero-content text-center text-neutral-content lg:w-full w-[300px]">
                        <div className=" lg:flex gap-24 justify-around items-center mt-6">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Welcome to the Hub of Ideas</h1>
                                <p className="mb-5 lato-italic">Join a vibrant community where your thoughts and opinions matter. Engage, share, and connect with like-minded individuals today!</p>
                            </div>
                            {/*  */}
                            <form onSubmit={handleSearch} className="max-w-full mx-auto" >
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative  md:w-[400px]">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    {/*  */}
                                    <input onChange={(e) => setSearchInput(e.target.value)} type="search" id="default-search" className="block text-black w-full p-4 pt-5 ps-10 text-sm custom-placeholder border border-gray-300 rounded-lg bg-gray-50/65 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search posts by tag" />
                                    <button type="submit" className="text-white  absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                                {/* */}
                            </form>
                            <button className=" bg-opacity-0 text-white" onClick={resetSearchInput}>Reset</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="py-10">
                <SectionTitle heading={'Explore Latest Posts'} subHeading={'Explore the Freshest Threads'} />
            </div>
            <div className="grid lg:grid-cols-2 items-center justify-center container mx-auto p-10 gap-y-6">
{/* 
                <div className="card w-[70vh] bg-base-100 shadow-xl">

                    <div className="card-body">
                      <div className="flex justify-between">
                      <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mr-3">
                            <p className="flex items-center gap-1"> <FaEnvelope />2</p>
                            <p className="flex items-center gap-1"> <AiOutlineLike />13</p>
                            <p className="flex items-center gap-1"> <AiTwotoneDislike />5</p>
                            <p className="flex items-center gap-1"> # For tast</p>
                        </div>
                      </div>

                        <h2 className="card-title">The Impact of Technology on Healthcare</h2>
                        <p>Technology is transforming healthcare delivery, improving patient care and outcomes. This post examines the role of technology in healthcare and its f...more</p>
                        <div className="card-actions justify-end">
                        <Link to={`/details/`} className="mt-6"><a href="#_" className="relative inline-block text-lg group">
                                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                    <span className="absolute left-0 w-48 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                    <span className="relative">View Details</span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                            </a></Link>
                        </div>
                    </div>
                </div> */}
                
{/* 1{post._id}  {post.authorImage}  2{post.postTitle} 3{post.comment} 4{post.upVote} {post.downVote}  5{post.tag}  6{post.postDescription.length > 40 ? `${post.postDescription.slice(0, 150)}...more` : post.postDescription}  7to={`/details/${post._id}`}*/}
                {
                    AllPosts.map(post => <div key={post._id} className="card lg:w-[70vh]  w-[320px] bg-base-100 shadow-xl">

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
                    </div>
                    // <div key={post._id} className="relative flex lg:w-full lg:h-[350px] flex-col rounded-xl bg-slate-400 bg-clip-border text-gray-700 shadow-none p-5 bg-opacity-45">
                    //     <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 lg:overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                    //         <img
                    //             src={post.authorImage}
                    //             alt="Tania Andrew"
                    //             className="relative inline-block h-[58px] lg:w-[58px] !rounded-full object-cover object-center"
                    //         />
                    //         <div className="flex w-full flex-col gap-0.5">
                    //             <div className="flex items-center justify-between">
                    //                 <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    //                     {post.postTitle}
                    //                 </h5>
                    //                 <div className="flex items-center gap-4 mr-3">
                    //                     <p className="flex items-center gap-1"> <FaEnvelope />{post.comment}</p>
                    //                     <p className="flex items-center gap-1"> <AiOutlineLike />{post.upVote}</p>
                    //                     <p className="flex items-center gap-1"> <AiTwotoneDislike />{post.downVote}</p>
                    //                     <p className="flex items-center gap-1"> # {post.tag}</p>

                    //                 </div>
                    //             </div>
                    //             <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                    //                 Frontend Lead @ Google
                    //             </p>
                    //         </div>
                    //     </div>
                    //     <div className="p-0 mb-6">
                    //         <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit mb-6">
                    //             {post.postDescription.length > 40 ? `${post.postDescription.slice(0, 150)}...more` : post.postDescription}
                    //         </p>


                    //         <Link to={`/details/${post._id}`} className="mt-6"><a href="#_" className="relative inline-block text-lg group">
                    //             <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    //                 <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    //                 <span className="absolute left-0 w-48 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    //                 <span className="relative">View Details</span>
                    //             </span>
                    //             <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                    //         </a></Link>
                    //     </div>
                    // </div>
                    )
                }

            </div>

            <section>
                {announcements.length > 0 ?
                    <>
                        <SectionTitle heading={'Announcement'} subHeading={'For you'} />

                        <div className="container mx-auto grid lg:grid-cols-2 my-24 gap-y-10">
                            {
                                announcements.map(item => <a key={item._id} href="#" className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <div className="avatar justify-between items-center flex">
                                        <div className="w-24 rounded-full">
                                            <img src={item.authorImage} />
                                        </div>
                                        <div className="w-24 rounded-full border-red-500 border-2">
                                            <img src="https://i.ibb.co/9b2MH3w/loudspeaker.jpg" />
                                        </div>
                                    </div>

                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                                </a>)
                            }
                        </div>

                    </>
                    : <></>}


            </section>
            <section id="TagPost">
                <div>
                    <TagPost />
                </div>
            </section>
        </div>
    );
};

export default Home;