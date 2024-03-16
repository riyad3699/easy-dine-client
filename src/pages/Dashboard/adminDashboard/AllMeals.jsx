import { Link } from "react-router-dom";
import useMeals from "../../../hooks/useMeals";
import { deleteMeal } from "../../../hooks/auth";
import toast from "react-hot-toast";

const AllMeals = () => {
    const [meals, refetch] = useMeals();

    const handleDelete = async(id) => {
        await deleteMeal(id);
        toast.success('Deleted successfully!');
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
                            <th>Distributor Name</th>
                            <th>Distributor Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>View Meal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            meals.map(meal =>
                                <tr key={`${meal._id}`}>
                                    <td>{`${meal.MealTitle}`}</td>
                                    <td>{`${meal.Likes}`}</td>
                                    <td>{`${meal.Reviews.length}`}</td>
                                    <td>{`${meal.AdminName}`}</td>
                                    <td>{`${meal.AdminEmail}`}</td>
                                    <td><Link to={`update/${meal._id}`}><button className="text-sm bg-green-600 text-white px-2 rounded-lg">Update</button></Link></td>
                                    <td><button onClick={()=> handleDelete(meal._id)} className="text-sm bg-red-600 text-white px-2 rounded-lg">Delete</button></td>
                                    <td><Link to={`/meals/${meal._id}`}><button className="text-sm bg-indigo-700 text-white px-2 rounded-lg">Details</button></Link></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMeals;