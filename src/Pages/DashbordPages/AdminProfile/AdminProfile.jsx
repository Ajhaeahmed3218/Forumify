import { FaUsers } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle";
import useAllPosts from "../../../Hooks/useAllPosts";
import useAllUsers from "../../../Hooks/useAllUsers";
import useComments from "../../../Hooks/useComments";
import { BsFileEarmarkPost } from "react-icons/bs";
import { PieChart, Pie, Cell,Legend } from 'recharts';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AdminProfile = () => {
    const [allPosts] = useAllPosts()
    const [users] = useAllUsers()
    const [comments] = useComments()
    const axiosSecure = useAxiosSecure()

  

    const data = [
        { name: 'Posts', value: allPosts.length },
        { name: 'Users', value: users.length },
        { name: 'Comments', value: comments.length }

    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const handleAddTag = (event) => {
        event.preventDefault();
        const form = event.target;

        const tag = {
            
            value: form.value.value, 
            label: form.label.value
        }

        axiosSecure.post('/tag', tag)
        .then(res => {
            console.log(res.data);
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Tag has been successfully added",
                showConfirmButton: false,
                timer: 1500
            });


        })
        console.log(tag);
    }


    return (
        <div>
            <SectionTitle heading={'Admin home'} subHeading={'Hi, Welcome Back!'} />

            <div className="lg:flex lg:flex-row flex-col justify-start items-center ml-12">

                <div>
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-figure text-4xl text-blue-300">
                                <BsFileEarmarkPost />
                            </div>
                            <div className="stat-title">All Posts</div>
                            <div className="stat-value">{allPosts.length}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-4xl text-blue-300">
                                <FaUsers />
                            </div>
                            <div className="stat-title">All Users</div>
                            <div className="stat-value">{users.length}</div>

                        </div>

                        <div className="stat">
                            <div className="stat-figure text-4xl text-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <div className="stat-title">All Comments</div>
                            <div className="stat-value">{comments.length}</div>

                        </div>

                    </div>
                </div>

                <div>

                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>

                </div>
            </div>

            <div className="mt-16">
                <form onSubmit={handleAddTag} className="flex flex-col p-10 space-y-2">
                    <label className="text-xl font-bold">Add New Tag</label>
                    <input id="tag" className="lg:w-1/3 h-[50px] border-2 rounded-xl p-1" required type="text" name="value" placeholder="Tag Value" />
                    <input id="tag" className="lg:w-1/3 h-[50px] border-2 rounded-xl p-1" required type="text" name="label" placeholder="Tag label" />
                    <input className="lg:w-1/3 h-[50px] rounded-xl bg-[#2596be] p-1" type="submit" value="Add" />

                </form>
            </div>


        </div>
    );
};

export default AdminProfile;