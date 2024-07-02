import { useEffect, useState } from "react";
import { BsPostcardFill } from "react-icons/bs";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { MdLocalActivity, MdManageAccounts, MdOutlinePostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAuht from "../Hooks/useAuht";
import useAllUsers from "../Hooks/useAllUsers";


const Dashbordlya = () => {
    const {user} = useAuht()
    const [users] = useAllUsers()
    const [ isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        const currentUser = users.find(arry => arry?.email === user?.email);
        if (currentUser && currentUser?.role === 'admin') {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [user, users]);

    return (
        <div>
            <div className="flex">
            <div className="w-64 min-h-[100vh]  bg-[#bdcbf4] p-4">
                <div className="my-6">
                    <h1 className="text-center text-2xl font-bold mb-3">Forumify</h1>
                    <p className="text-center lato-italic">Connect, Share, and Grow Together.</p>
                </div>
                <ul className="menu  space-y-4 text-xl">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to={'/dashbord/adminProfile'}><FaUserAlt />  Admin Profile</NavLink></li>
                                <li ><NavLink to={'/dashbord/manageUsers'}><MdManageAccounts className="text-2xl"/>  Manage Users</NavLink></li>
                                <li><NavLink to={'/dashbord/ReportedActivities'}> <MdLocalActivity className="text-[24px]" /> Reported Activities</NavLink></li>
                                <li><NavLink to={'/dashbord/announcement'}><BsPostcardFill />Announcement</NavLink></li>

                            </>
                            : <>
                                <li><NavLink to={'/dashbord/userProfile'}><FaUserAlt />  My Profile</NavLink></li>
                                <li><NavLink to={'/dashbord/userPosts'}><BsPostcardFill />  My Posts</NavLink></li>
                                <li><NavLink to={'/dashbord/userAddPost'}> <MdOutlinePostAdd className="text-[24px]" /> Add Post</NavLink></li>
                            </>
                    }

                    <div className="divider"></div>
                    {/* Shared navlink */}
                    <li><NavLink to={'/'}><FaHome />  Home</NavLink></li>
                    <li><NavLink to={'/membership'}><BsPostcardFill />  Membership</NavLink></li>

                </ul>
            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
        </div>


    );
};

export default Dashbordlya;