import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useReviewedMeals from "../../../hooks/useReviewedMeal";
import { deleteComment, updateComment } from "../../../hooks/auth";
import toast from "react-hot-toast";

const UserReviews = () => {
    const { user } = useAuth();
    const [meals, refetch] = useReviewedMeals(user?.displayName);
    console.log(meals);


    const handleDelete = async (name, comment) => {

        await deleteComment(name, comment);
        toast.success('Deleted Successfully')
        await refetch()

    }

    const handleUpdate = async (e, meal) => {
        e.preventDefault();
        console.log(e.target.editedReview.value, meal);
        const currentComment = { editedComment: e.target.editedReview.value };
        const prevComment = await meal?.Reviews?.find(review => review?.Name === user?.displayName)?.Description;
        await updateComment(user?.displayName, prevComment, currentComment);
        toast.success('Review is edited')
        await refetch()


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
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View details</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            meals?.map(meal =>
                                <tr key={`${meal._id}`}>
                                    <td>{`${meal.MealTitle}`}</td>
                                    <td>{`${meal.Likes}`}</td>
                                    <td>{`${meal.Reviews?.length}`}</td>

                                    <td>
                                        {/* The button to open modal */}
                                        <label htmlFor="my_modal_7" className="text-sm bg-green-600 text-white px-2 rounded-lg">Edit</label>

                                        {/* Put this part before </body> tag */}
                                        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                        <div className="modal" role="dialog">
                                            <div className="modal-box">
                                                <form className="flex flex-col items-center" onSubmit={async(e)=>handleUpdate(e, meal)}>
                                                    <input type="text" name="editedReview" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                                    <button type="submit" className="mt-2 bg-indigo-700 text-white px-2 py-1 rounded-lg">Update</button>
                                                </form>
                                            </div>
                                            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                                        </div>
                                    </td>
                                    <td><button onClick={() => handleDelete(user?.displayName, meal.Reviews.find(review => review?.Name === user.displayName).Description)} className="text-sm bg-red-600 text-white px-2 rounded-lg">Delete</button></td>
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

export default UserReviews;