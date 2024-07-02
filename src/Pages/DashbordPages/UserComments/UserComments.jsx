import  { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import Select from 'react-select';
import useAuht from '../../../Hooks/useAuht';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UserComments = () => {
    const posts = useLoaderData();
    const [selectedTags, setSelectedTags] = useState({});
    const {user} = useAuht()
    const axiosSecure = useAxiosSecure()
    const options = [
        { value: 'hate-speech', label: 'Hate Speech' },
        { value: 'spam', label: 'Spam' },
        { value: 'harassment', label: 'Harassment' },
        { value: 'other', label: 'Other' }
    ];

    const handleSelectChange = (postId, selectedOption) => {
        setSelectedTags(prevState => ({
            ...prevState,
            [postId]: selectedOption
        }));
    };

    const handleReportClick = (postId) => {
        if (selectedTags[postId]) {
            // Logging the data to console
            const post = posts.find(post => post._id === postId);
            const reportInfo = {
                reportBy: user.email,
                commenter : post.commenter,
                commentId : post._id,
                comment : post.comment,
                report : selectedTags[postId].label,
                action :false
            }
            console.log(reportInfo);
            axiosSecure.post('/reports', reportInfo)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your report has been successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });


            })

            // Alerting the selected tag
            // alert(`Reported with tag: ${selectedTags[postId].label}`);
        }
    };

    return (
        <div>
            <SectionTitle heading={'Comments for you '} subHeading={'comment in'}></SectionTitle>

            <div>
                <div className="lg:overflow-visible overflow-x-auto">
                    <table className="table table-zebra ">
                        <thead className="bg-[#bdcbf4]">
                            <tr>
                                <th></th>
                                <th>commenter</th>
                                <th>comment</th>
                                <th>Feedback</th>
                                <th>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post, inx) => (
                                    <tr key={post._id}>
                                        <th>{1 + inx}</th>
                                        <td>{post.commenter}</td>
                                        <td>{post.comment}</td>
                                        <td className='z-10'>
                                            <Select
                                                className="w-full h-[50px] border-2 rounded-xl p-1 "
                                                required
                                                name="tag"
                                                options={options}
                                                placeholder="Select Tag"
                                                onChange={(selectedOption) => handleSelectChange(post._id, selectedOption)}
                                            />
                                        </td>
                                        <td>
                                            {post?.seen ? (
                                                "Reported"
                                            ) : (
                                                selectedTags[post._id] && (
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => handleReportClick(post._id)}
                                                    >
                                                        Report
                                                    </button>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserComments;
