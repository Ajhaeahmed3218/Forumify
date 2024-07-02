import { SlBadge } from "react-icons/sl";
import useAuht from "../../../Hooks/useAuht";
import useAllUsers from "../../../Hooks/useAllUsers";
import usePost from "../../../Hooks/usePost";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";


const UserProfile = () => {
    const { user } = useAuht()
    const [users] = useAllUsers()
    const [posts] = usePost()
    const sortedPosts = posts.sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime));
    const recentPosts = sortedPosts.slice(0, 3);
    const currentUser = users.find(arry => arry.email === user.email)
    console.log(recentPosts);
    return (
        <div>
            <div className="bg-white shadow-lg rounded-2xl w-full h-screen dark:bg-gray-800">
                <img alt="profil" src="https://i.ibb.co/6skD4Rp/mountain2.jpg" className="w-full mb-4 rounded-t-lg h-[350px]" />
                <div className="flex flex-col items-center justify-center p-4 -mt-16">
                    <a href="#" className="relative block">
                        <img alt="profil" src={user.photoURL} className="mx-auto object-cover rounded-full h-[250px] w-[250px] border-2 border-white dark:border-gray-800" />
                    </a>
                    <p className="mt-2 text-3xl font-medium text-gray-800 dark:text-white">
                        {user.displayName}
                    </p>
                    <p className="mb-4 text-xl text-gray-400">
                        {user.email}
                    </p>
                    <div className="flex flex-col justify-center items-center">
                        { currentUser.membership === "gold" ? <p className="flex gap-1"> Gold <SlBadge className="text-2xl text-yellow-400 " /> </p> : <p className="flex gap-1"> Bronze <SlBadge className="text-2xl text-slate-400 " /> </p>}
                        <p className="p-2 px-4 text-2xl rounded-full">
                            {`${currentUser?.membership} Badge`}
                        </p>
                    </div>
                    <div className="w-full p-2 mt-4 rounded-lg">
                        <div className=" grid lg:grid-cols-2 text-sm text-gray-600 dark:text-gray-200">
                            {
                                recentPosts.map(post => <div key={post._id} className="relative flex w-2/3  flex-col rounded-xl bg-slate-400 bg-clip-border text-gray-700 shadow-none p-5 bg-opacity-45">
                                    <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                                        <img
                                            src={post.authorImage}
                                            alt="Tania Andrew"
                                            className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
                                        />
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                    {post.postTitle}
                                                </h5>
                                                <div className="flex items-center gap-4 mr-3">
                                                    <p className="flex items-center gap-1"> <FaEnvelope />{post.comment}</p>
                                                    <p className="flex items-center gap-1"> <AiOutlineLike />{post.upVote}</p>
                                                    <p className="flex items-center gap-1"> # {post.tag}</p>

                                                </div>
                                            </div>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                                                Frontend Lead @ Google
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-0 mb-6">
                                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit mb-6">
                                            {post.postDescription.length > 40 ? `${post.postDescription.slice(0, 150)}...more` : post.postDescription}
                                        </p>


                                        <Link to={`/details/${post._id}`} className="mt-6"><a href="#_" className="relative inline-block text-lg group">
                                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                <span className="absolute left-0 w-48 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                <span className="relative">View Details</span>
                                            </span>
                                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                        </a></Link>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;