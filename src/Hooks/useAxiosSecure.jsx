import axios from "axios";

 const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-six-kappa.vercel.app'
})

const useAxiosSecure = () => {
    // axiosSecure.interceptors.request.use(function (config) {
    //     return config
    // }, (error) => {
    //     console.log('status error in the interceptors',  );
    //     return Promise.reject(error)
    // })
    return axiosSecure ;
};

export default useAxiosSecure;