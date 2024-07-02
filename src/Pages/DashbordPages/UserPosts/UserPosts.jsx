import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import usePost from "../../../Hooks/usePost";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const UserPosts = () => {
    const [posts, refetch] = usePost()
    const axiosSecure = useAxiosSecure()
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/allPosts/${user._id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
       }
    return (
        <div>
            <SectionTitle heading={'your all posts'} subHeading={'my post'} />
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead className="bg-[#bdcbf4]">
                            <tr>
                                <th></th>
                                <th>Post Title</th>
                                <th>Votes</th>
                                <th>Comment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post, inx) => <tr key={post._id}>
                                    <th>{1 + inx}</th>
                                    <td>{post.postTitle}</td>
                                    <td>{post.upVote}</td>
                                    <td><Link to={`/dashbord/userComments/${post._id}`}><button className="btn btn-sm">Comment</button></Link></td>
                                    <td><button onClick={() => handleDeleteUser(post)} className="btn btn-sm">Delete</button></td>
                                </tr>)

                            }



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserPosts;