
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle";
// import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Select from 'react-select';
import useAuht from "../../Hooks/useAuht";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MembershipCard from "../../Components/MembershipCard";
import usePost from "../../Hooks/usePost";
import useAllUsers from "../../Hooks/useAllUsers";
import { useQuery } from "@tanstack/react-query";



const UserAddPost = () => {
    const { user } = useAuht();
    const [post] = usePost()
    const [users] = useAllUsers()
    const axiosSecure = useAxiosSecure()

    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('tag');
            return res.data
        }
    })
    
    const options = tags.map(tag => ({ value: tag.value, label: tag.label }));

    
    const currentUser = users.find(arry => arry.email === user.email)
    
    console.log(currentUser?.membership);
    const handleAddPost = event => {
        event.preventDefault();
        const form = event.target;

        const authorName = form.authorName.value;
        const authorImage = form.authorImage.value;
        const postTitle = form.postTitle.value;
        const postDescription = form.postDescription.value;
        const upVote = 0;
        const authorEmail = form.authorEmail.value;
        const downVote = 0;
        const comment = 0;
        const tag = form.tag.value;
        const currentTime = new Date().toISOString();

        const info = {
            authorName, authorImage, postTitle, postDescription, upVote, authorEmail, downVote, comment, tag , currentTime
        };
        console.log(info);

        // Send data to server------------------------------------
        axiosSecure.post('/allPosts', info)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your post has been successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });


            })

        
    }

    return (
        <div>
            <div className="mt-8">
                <SectionTitle subHeading={'What is new?'} heading={'Add a Post'} />
            </div>
            <Helmet>
                <title>Add food items | Nawabsahab</title>
            </Helmet>
            {/* <h1 className="md:text-4xl text-2xl font-bold text-center">Add a Food Item</h1> */}

            {
                post.length < 5 && currentUser?.membership === 'bronze' || currentUser?.membership === 'gold'  ?<form onSubmit={handleAddPost} className="border-2 md:p-6 md:mx-5 rounded-xl my-[100px]">
                <div className="grid md:grid-cols-2 gap-7 p-16">
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="authorName" placeholder="Author Name" />
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="authorImage" placeholder="Author Image" defaultValue={user?.photoURL} />
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="postTitle" placeholder="Post Title" />
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="postDescription" placeholder="Post Description" />
                    <Select className="w-full h-[50px] border-2 rounded-xl p-1" required name="tag" options={options} placeholder="Select Tag" />
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="email" value={user?.email} placeholder="Author Email" name="authorEmail" />
                </div>
                <div className="container mx-auto">
                    <input className="lg:w-full h-[50px] rounded-xl bg-[#2596be] p-1" type="submit" value="Add" />
                </div>
                
            </form>:<MembershipCard/>
            }
           


            {
              post.length >= 5 && currentUser?.membership === 'bronze' &&  <MembershipCard/>
                
            }

            
        </div>
    );
};

export default UserAddPost;
