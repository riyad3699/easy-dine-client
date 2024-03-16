import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const useUpcomingMeals = () => {
    const axiosSecure = useAxiosSecure()
    const {data: upcoming=[]} = useQuery({
        queryKey: ['upcoming'],
        queryFn:async () => {
            
            const response = await axiosSecure.get(`/upcomingMeals`)
            return response.data;
        }
    })
    


    return [upcoming];
};

export default useUpcomingMeals;