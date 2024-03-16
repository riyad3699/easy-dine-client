import toast from "react-hot-toast";
import { serveMeal } from "../../../hooks/auth";
import useRequestedMeals from "../../../hooks/useRequestedMeals";

const ServeMeals = () => {
    const [reqMeals, refetch] = useRequestedMeals();
    console.log(reqMeals);
    const handleServeMeal = async(id) => {
        await serveMeal(id);
        toast.success('Delivered Successfully')
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
                            <th>Email</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Serve</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            reqMeals.map(meal =>
                                <tr key={`${meal._id}`}>
                                    <td>{`${meal.meal_title}`}</td>
                                    <td>{`${meal.email}`}</td>
                                    <td>{`${meal.user_name}`}</td>
                                    <td>{`${meal.status}`}</td>
                                    <td>{meal.status === 'Pending' && <button onClick={()=>handleServeMeal(meal._id)} className="text-sm bg-indigo-700 text-white px-2 rounded-lg">Serve</button>}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;