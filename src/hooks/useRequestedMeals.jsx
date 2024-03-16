import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const useRequestedMeals = () => {
    const axiosSecure = useAxiosSecure()
    const {data: reqMeals=[], refetch} = useQuery({
        queryKey: ['reqMeals'],
        queryFn:async () => {
            
            const response = await axiosSecure.get(`/requestedMeals`)
            return response.data;
        }
    })
    


    return [reqMeals, refetch];
};

export default useRequestedMeals;