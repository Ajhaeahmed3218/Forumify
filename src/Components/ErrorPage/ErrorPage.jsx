import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col  justify-center items-center">
                <img className="w-1/3" src="https://i.ibb.co/vv101PB/404-1.jpg" alt="404 Page "  />
                <Link to={'/'}><button className="btn bg-blue-200">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;