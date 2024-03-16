import axios from "axios";
import { clearToken } from "./auth";

const axiosSecure = axios.create({
    baseURL: 'https://easy-dine-server.vercel.app',
    withCredentials: true,
})

const useAxiosSecure = () => {
    axiosSecure.interceptors.response.use( response => response,
        async error => {
            console.log('error found', error.response);
            if(error.response && (error.response.status === 401 || error.response.status === 403)){
                await clearToken()
                window.location.replace('/login')
            }
            return Promise.reject(error)
        })
        return axiosSecure;
};

export default useAxiosSecure;