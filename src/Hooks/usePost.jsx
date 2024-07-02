import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAuht from "./useAuht";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const usePost = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts', user?.email], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/allPost?email=${user?.email}`);
            return res.data;
        }
    });

    return [posts, refetch];
};

export default usePost;
