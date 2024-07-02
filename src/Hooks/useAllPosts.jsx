import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllPosts = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allPosts = [], refetch } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get('allPosts');
            return res.data
        }
    })
    return [allPosts, refetch]
};

export default useAllPosts;