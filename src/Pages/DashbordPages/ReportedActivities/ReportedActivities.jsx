import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useReport from "../../../Hooks/useReport";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ReportedActivities = () => {
    const [reports,refetch] = useReport()
    const axiosSecure = useAxiosSecure()
    const handleDelete = (id) => {
        console.log(id);
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

                axiosSecure.delete(`/reports/${id}`)
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
    const handleCommentDelete = (id, id2) => {
        console.log(id);
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
                axiosSecure.delete(`/reports/${id2}`)
                axiosSecure.delete(`/comment/${id}`)
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
            <SectionTitle heading={'Reported Activities'} subHeading={'you have super power'}/>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>ReportBy</th>
                            <th>Commenter</th>
                            <th>comment</th>
                            <th>report</th>
                            <th>Delete Comment</th>
                            <th>Delete Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map((report, inx) => <tr key={report._id}>
                                <th>{inx + 1}</th>
                                <td>{report?.reportBy}</td>
                                <td>{report?.commenter}</td>
                                <td>{report?.comment}</td>
                                <td>{report?.report}</td>
                                <td><button onClick={() => handleCommentDelete(report?.commentId, report._id)} className="btn btn-sm bg-red-500 text-white">Delete</button></td>
                                <td><button onClick={() => handleDelete(report._id)} className="btn btn-sm bg-red-500 text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedActivities;