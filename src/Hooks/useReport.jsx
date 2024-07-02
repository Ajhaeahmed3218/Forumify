import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useReport = () => {
    const axiosSecure = useAxiosSecure()

    const { data: reports = [], refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('reports');
            return res.data
        }
    })
    return [reports, refetch]
};

export default useReport;