
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReviewedMeals = (name) => {
    const axiosSecure = useAxiosSecure()
    const {refetch, data: meals=[]} = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/comments/${name}`)
            return response.data;
        }
    })

    return  [meals, refetch];
};

export default useReviewedMeals;