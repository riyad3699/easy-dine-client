import useUpcomingMeals from "../hooks/useUpcomingMeals";
import UpcomingMealCard from "./UpcomingMealCard";

const UpcomingMeals = () => {
    const [upcoming] = useUpcomingMeals();
    return (
        <div>
            <div className='mx-4 lg:mx-8 my-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    upcoming?.map(meal => <UpcomingMealCard key={meal._id} meal={meal}></UpcomingMealCard>)
                }
            </div>
        </div>
    );
};

export default UpcomingMeals;