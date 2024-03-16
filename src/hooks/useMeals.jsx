import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMeals = (priceSort, search, category) => {
    const axiosSecure = useAxiosSecure()
    // use query
    const {data: meals=[], refetch} = useQuery({
        queryKey: ['meals', priceSort, search, category],
        queryFn:async () => {
            if (!priceSort) {
                priceSort = [0,1000];
            }
            if (!search) {
                search = [''];
            }
            if (!category) {
                category = [''];
            }
            
            const response = await axiosSecure.get(`/meals?sort=${priceSort}&text=${search}&category=${category}`)
            return response.data;
        }
    })
    


    return [meals, refetch];
};

export default useMeals;