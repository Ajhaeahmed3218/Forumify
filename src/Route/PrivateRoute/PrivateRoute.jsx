import { Navigate, useLocation } from "react-router-dom";
import useAuht from "../../Hooks/useAuht";



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuht()
    const location = useLocation()
    if (loading) {
        return <div>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;