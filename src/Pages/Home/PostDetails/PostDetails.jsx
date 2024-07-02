import { useParams } from "react-router-dom";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuht from "../../../Hooks/useAuht";
// import usePost from "../../../Hooks/usePost";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PostDetails = () => {
    const postId = useParams();
    // const [, refetch] = usePost()
    const [comment, setComment] = useState('');
    const axiosPublic = useAxiosPublic()
    const shareUrl = window.location.href; // Assign the current URL to shareUrl
    console.log(postId);
    const axiosSecure = useAxiosSecure()

    const { data: post = [], refetch } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allPosts/${postId.id}`);
            commentRefetch()
            return res.data
        }
    })

    const { data: postComments = [], refetch : commentRefetch } = useQuery({
        queryKey: ['PostComments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comment/${post._id}`);
            return res.data
        }
    })

    console.log(postComments);

    // console.log(post);
    const { user } = useAuht()
    // Up Vote
    const handlevoteUp = (id) => {
        console.log(id);
        const voter = user?.email
        const data = { id, voters: [voter] }

        if (post.authorEmail === user?.email) {
            Swal.fire({
                title: 'Oops!',
                text: "You can't vote your own added post.",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        axiosPublic.post('/voteUp', data)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Vote has been successfully added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Your Already voted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            })
    }
    // Down Vote

    const handleVoteDown = (id) => {
        console.log(id);
        const voter = user?.email
        const data = { id, voters: [voter] }

        if (post.authorEmail === user?.email) {
            Swal.fire({
                title: 'Oops!',
                text: "You can't dOWN vote your own added post.",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        axiosPublic.post('/votedOWN', data)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Vote has been successfully added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Your Already voted UP",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            })
    }
    // Comment Section
    const handleChange = (event) => {
        setComment(event.target.value);
    }

    const handleSubmit = (id) => {
        const commentInfo = {
            comment,
            commenter: user.email,
            comentedPost: id,
            seen: false
        }
        console.log(commentInfo);
        if (post.authorEmail === user?.email) {
            Swal.fire({
                title: 'Oops!',
                text: "You can't comment your own added post.",
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        axiosPublic.post('/comment', commentInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Vote has been successfully added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Your Already commented",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            })
    };

    return (
        <div className="p-32 max-w-full h-screen bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="avatar">
                <div className="w-40 rounded-full">
                    <img src={post.authorImage} alt="Author" />
                </div>
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.postTitle}</h5>
            <p>{post.authorEmail}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400 lg:w-1/2">{post.postDescription}</p>
            <div className="text-2xl mt-2">
                <p>Tag: #{post.tag}</p>
                <p>Post Date: {new Date(post.currentTime).toLocaleDateString()}</p>
                <div className="flex gap-5 items-center">
                    <p onClick={() => handlevoteUp(post._id)} className="mt-2 flex gap-1 items-center">{post?.upVote}<AiTwotoneLike /></p>
                    <p onClick={() => handleVoteDown(post._id)} className="mt-2 flex gap-1 items-center">{post?.downVote}<AiTwotoneDislike /></p>
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                </div>
                <label className="form-control lg:w-1/4 mt-4">
                    <div className="label">
                        <span className="label-text">Comment Please</span>
                    </div>
                    <div className="flex flex-col ju">
                        <textarea className="textarea textarea-bordered h-24"
                            placeholder="Comment"
                            value={comment}
                            onChange={handleChange}
                        ></textarea>
                        <button className="btn" onClick={() => handleSubmit(post._id)}>Submit</button>
                    </div>
                </label>
            </div>

            <div className="my-10">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        postComments.map(comment => <li key={comment._id} className="py-3 sm:py-4 border-none">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {comment.commenter}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {comment.comment}
                                    </p>
                                </div>
                                
                            </div>
                        </li>)
                    }
                    
                </ul>
            </div>
        </div>
    );
};

export default PostDetails;
