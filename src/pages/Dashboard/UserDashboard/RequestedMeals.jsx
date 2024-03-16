
import toast from "react-hot-toast";
import { deleteRequestedMeal } from "../../../hooks/auth";
import useAuth from "../../../hooks/useAuth";
import useRequestedMeals from "../../../hooks/useRequestedMeals";

const RequestedMeals = () => {
    const { user } = useAuth();
    const [meals, refetch] = useRequestedMeals()
    const reqMeals = meals?.filter(meal => meal?.email === user?.email);
    console.log(meals);

    const handleDelete = async(id) => {
        await deleteRequestedMeal(id);
        toast.success('Canceled successfully!');
        refetch();
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
                            <th>Status</th>
                            <th>Cancel</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            reqMeals.map(meal =>
                                <tr key={`${meal._id}`}>
                                    <td>{`${meal.meal_title}`}</td>
                                    <td>{`${meal.likes}`}</td>
                                    <td>{`${meal.reviews}`}</td>
                                    <td>{`${meal.status}`}</td>
                                    <td>{meal.status === 'Pending' && <button onClick={()=> handleDelete(meal._id)} className="text-sm bg-red-600 text-white px-2 rounded-lg">Cancel</button>}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;