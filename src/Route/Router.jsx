import {
    createBrowserRouter,

  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";

import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UserAddPost from "../Dashboard/UserDashbord/UserAddPost";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashbordlya from "../Layout/Dashbordlya";
import UserProfile from "../Pages/DashbordPages/UserProfile/UserProfile";
import UserPosts from "../Pages/DashbordPages/UserPosts/UserPosts";
import PostDetails from "../Pages/Home/PostDetails/PostDetails";
import AllUser from "../Pages/DashbordPages/AllUser/AllUser";
import Announcement from "../Pages/DashbordPages/Announcement/Announcement";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import UserComments from "../Pages/DashbordPages/UserComments/UserComments";
import ReportedActivities from "../Pages/DashbordPages/ReportedActivities/ReportedActivities";
import AdminProfile from "../Pages/DashbordPages/AdminProfile/AdminProfile";
import Membership from "../Pages/Membership/Membership";
import Payment from "../Pages/DashbordPages/Payment/Payment";






export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement:<ErrorPage/>,
      children :[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/payment',
            element:<Payment/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:'/membership',
            element:<Membership/>
        },
        {
            path:'/details/:id',
            element:<PostDetails/>,
            // loader: ({params}) => fetch(`https://assignment-12-server-six-kappa.vercel.app/allPosts/${params.id}`)
        },
      
        

      ]
    },
    {
      path:'dashbord',
      element:<PrivateRoute><Dashbordlya/></PrivateRoute>,
      errorElement:<ErrorPage/>,
      children :[
        {
          path:'adminProfile',
          element:<AdminProfile/>
        },
        {
          path:'userProfile',
          element:<UserProfile/>
        },
        {
          path:'userPosts',
          element:<UserPosts/>
        },
        {
          path:'userAddPost',
          element:<UserAddPost/>
        },
        // Admin Route
        {
          path:'manageUsers',
          element:<AllUser/>
        },
        {
          path:'announcement',
          element:<Announcement/>
        },
        {
          path:'ReportedActivities',
          element:<ReportedActivities/>
        },
        {
          path:'userComments/:id',
          element:<UserComments/>,
          loader: ({params}) => fetch(`https://assignment-12-server-six-kappa.vercel.app/comment/${params.id}`)
          
        }
        
      ]
    }
  ]);