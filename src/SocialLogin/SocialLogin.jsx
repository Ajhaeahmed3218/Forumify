import { FaGoogle } from "react-icons/fa";
import useAuht from "../Hooks/useAuht";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const SocialLogin = () => {
    const { googleSignin } = useAuht()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    const handleGoogleLogin = () => {
        googleSignin()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    membership : "bronze"
                }
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(location?.state ? location.state : '/')

                    })
                navigate(location?.state ? location.state : '/')
                console.log("login paisi");
                return Swal.fire({
                    title: 'Success',
                    text: "Successfully Login With Google.",
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })

            })
            .catch((error) => {
                console.error(error);
                return Swal.fire({
                    title: 'error',
                    text: (error.message),
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })
    }
    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn border-blue-400 mr-6 mt-6 lg:w-1/2"><span className="text-xl text-blue-500"><FaGoogle /></span> Google</button>

        </div>
    );
};

export default SocialLogin;