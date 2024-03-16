import toast from "react-hot-toast";
import { addMeal, deleteMeal, deleteUpcomingMeal, serveMeal } from "../../../hooks/auth";
import useUpcomingMeals from "../../../hooks/useUpcomingMeals";

const Upcoming = () => {
    const [upcoming, refetch] = useUpcomingMeals();

    const handleDelete = async (id) => {
        await deleteUpcomingMeal(id);
        toast.success('Deleted successfully!');
        refetch();
    }

    const handlePublish = async (id, meal) => {
        const newMeal = {
            MealTitle: meal.MealTitle,
            MealType: meal?.MealType
            , MealImage: meal?.MealImage
            , Ingredients: meal?.Ingredients
            , Description: meal?.Description
            , Price: meal?.Price
            , Rating: meal?.Rating
            , PostTime: meal?.PostTime
            , AdminName: meal?.AdminName
            , AdminEmail: meal?.AdminEmail
            , Likes: meal.Likes,
            Reviews: meal.Reviews
        }
        if (meal?.Likes > 9) {
            await addMeal(newMeal);
            await deleteUpcomingMeal(id);
            toast.success('Published successfully!');
            refetch();
        } else {
            toast.error('At least need 10 likes to publish a meal!')
        }

    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Distributor Name</th>
                            <th>Distributor Email</th>
                            <th>Delete</th>
                            <th>Publish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            upcoming.map(meal =>
                                <tr key={`${meal._id}`}>
                                    <td>{`${meal.MealTitle}`}</td>
                                    <td>{`${meal.Likes}`}</td>
                                    <td>{`${meal.Reviews.length}`}</td>
                                    <td>{`${meal.AdminName}`}</td>
                                    <td>{`${meal.AdminEmail}`}</td>
                                    <td><button onClick={() => handleDelete(meal._id)} className="text-sm bg-red-600 text-white px-2 rounded-lg">Delete</button></td>
                                    <td><button onClick={() => handlePublish(meal._id, meal)} className="text-sm bg-indigo-700 text-white px-2 rounded-lg">Publish</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Upcoming;