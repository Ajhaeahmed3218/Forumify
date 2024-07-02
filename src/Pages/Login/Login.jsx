import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuht from "../../Hooks/useAuht";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../SocialLogin/SocialLogin";



const Login = () => {
    const {googleSignin, signIn} = useAuht()
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value
        // console.log(email, password);

        signIn(email, password)
            .then(result => {
                
                navigate(location?.state ? location.state : '/')
                return Swal.fire({
                    title: 'Success',
                    text: "Successfully Login.",
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }

                )

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

    // const handleGoogleLogin = () => {
    //     googleSignin()
    //         .then(result => {
    //             navigate(location?.state ? location.state : '/')
    //             console.log("login paisi");
    //             return Swal.fire({
    //                 title: 'Success',
    //                 text: "Successfully Login With Google.",
    //                 icon: 'success',
    //                 confirmButtonText: 'Cool'
    //             })

    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             return Swal.fire({
    //                 title: 'error',
    //                 text: (error.message),
    //                 icon: 'error',
    //                 confirmButtonText: 'Cool'
    //             })
    //         })
    // }
    return (
        <div className="lg:pt-0 pt-20 ">
            <Helmet>
                <title>
                Forumify | login
                </title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="mr-12 w-1/2">
                        <img src="https://i.ibb.co/Ytw8jTm/authentication2-1.jpg" alt="" />
                    </div>
                    <div className="card card-body shrink-0 w-full max-w-sm shadow-2xl bg-slate-400">
                        <h1 className="text-4xl font-semibold text-center mt-5">Login </h1>

                        <form  className="" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="divider"></div> 
                            {/* <button onClick={handleGoogleLogin} className="btn border-blue-400 mr-6 mt-6 lg:w-1/2"><span className="text-xl text-blue-500"><FaGoogle /></span> Google</button> */}
                            <SocialLogin/>
                        </form>

                        <p className="my-4 text-center">New to Nawab Sahab ? <Link className="text-[#FF3811] font-bold" to={"/register"}>Register</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;