import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAuht = () => {
    const auth = useContext(AuthContext);
    return auth ;
};

export default useAuht;