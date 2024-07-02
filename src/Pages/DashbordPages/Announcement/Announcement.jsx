import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAuht from "../../../Hooks/useAuht";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const Announcement = () => {
    const {user} = useAuht()
    const axiosPublic = useAxiosPublic()
    const handleAddPost = event => {
        event.preventDefault();
        const form = event.target;

        const authorName = form.authorName.value;
        const authorImage = form.authorImage.value;
        const title = form.postTitle.value;
        const description = form.postDescription.value;



        const info = {
            authorName, authorImage, title, description
        };
        console.log(info);

        // Send data to server------------------------------------
        axiosPublic.post('/announcement', info)
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
            <SectionTitle heading={"Announcements"} subHeading={'Community Highlights'} />

            <form onSubmit={handleAddPost} className="border-2 md:p-6 md:mx-5 rounded-xl my-[100px]">
                <div className="grid md:grid-cols-2 gap-7 p-16">
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="authorName" placeholder="Author Name" value={user.displayName}/>
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="authorImage" placeholder="Author Image" defaultValue={user?.photoURL} />
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="postTitle" placeholder="Announcement Title" />
                    <input className="w-full h-[50px] border-2 rounded-xl p-1" required type="text" name="postDescription" placeholder="Announcement Description" />
                    
                </div>
                <div className="container mx-auto">
                    <input className="lg:w-full h-[50px] rounded-xl bg-[#2596be] p-1" type="submit" value="Add" />
                </div>
            </form>
        </div>
    );
};

export default Announcement;