import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuht from "../../../Hooks/useAuht";
// import usePost from "../../../Hooks/usePost";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAnnouncement from "../../../Hooks/useAnnouncement";
import useAllUsers from "../../../Hooks/useAllUsers";
import { useEffect, useState } from "react";



const Navbar = () => {
    const { loading, user, logOut, setUser } = useAuht()
    const [announcements] = useAnnouncement()
    const [users] = useAllUsers()
    const axiosSecure = useAxiosSecure()
    // const currentUser = users.find(arry => arry?.email === user?.email)
    const [ isAdmin, setAdmin] = useState(false)

    // if (currentUser) {
    //     if(currentUser?.role === 'admin'){
    //         setAdmin(true) 
    //     }
    // }

    useEffect(() => {
        const currentUser = users.find(arry => arry?.email === user?.email);
        if (currentUser && currentUser?.role === 'admin') {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [user, users]);


    axiosSecure.get('/allPost')
        .then(res => {
            console.log(res.data);
        })
    const handleLogout = () => {
        logOut()
        setUser(null)
    }
    console.log(loading);
    const navLink = <>
        <li><NavLink to={"/"} className={({ isActive }) => isActive ? " border-2 border-none bg-[#bdcbf4] py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 lg:text-white "}>Home</NavLink></li>

        <li><NavLink to={"/membership"} className={({ isActive }) => isActive ? " border-2 border-none bg-[#bdcbf4]  py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 lg:text-white"}>Membership</NavLink></li>

        <li><NavLink to={"/login"} className={({ isActive }) => isActive ? " border-2 border-none bg-[#bdcbf4]  py-3 px-5 font-bold rounded-xl" : "font-bold py-3 px-5 lg:text-white"}>Join US</NavLink></li>

        <li><span className="text-xl text-white">
            <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-[#bdcbf4] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <FaBell className="text-xl "/>
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{announcements.length}</div>
            </button>
        </span></li>


    </>
    return (
        <div className="lg:w-full w-full ">
            <div className="navbar fixed z-30 bg-slate-600 opacity-80 lg:w-full w-[320px]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    <Link to={"/"} className="btn btn-ghost text-2xl text-white lg:ml-16 lato-italic">Forumify</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end lg:mr-6">
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-end " >
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar lg:tooltip lg:tooltip-bottom" data-tip={user?.displayName}>
                                        <div className="w-11 rounded-full " >
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[12] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName || "user name not found"}
                                            </a>
                                        </li>
                                        <li><a>{user.email || "email in not found "}</a></li>
                                        <li className="font-bold">{isAdmin? <NavLink to={"/dashbord/adminProfile"} >Dashboard</NavLink>: <NavLink to={"/dashbord/userProfile"} >Dashboard</NavLink>}</li>

                                        <li><a onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </div>
                                <a onClick={handleLogout} className="btn lg:flex hidden ">Logout</a>
                            </>
                            : <Link to={"/login"} className="btn">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;