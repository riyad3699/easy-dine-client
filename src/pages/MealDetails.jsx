import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Heart from "react-animated-heart";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { addComment, addLike, addLikedMeal, saveRequestedMeal } from "../hooks/auth";
import toast from "react-hot-toast";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";

const MealDetails = () => {

    const meal = useLoaderData();
    
    const { user } = useAuth();
    const [users] = useUser();
    const [userComment, setUserComment] = useState(meal?.Reviews);

    const currentUser = users?.find(u => u?.email === user?.email);

    let isClick = false;

    if (currentUser?.likedMeals.includes(meal.MealTitle)) {
        isClick = true;
    }

    const handleLike = async () => {
        console.log(meal.MealTitle);
        const meal_title = meal.MealTitle
        if (!currentUser.likedMeals.includes(meal?.MealTitle)) {
            try {
              const res =  await addLikedMeal(currentUser?.email, {meal_title})
              console.log(res)
                await addLike(meal._id)
                isClick = true

            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleRequest = async () => {
        if (currentUser?.status != 'Bronze') {
            await saveRequestedMeal(meal, user)
            toast.success('Order is successful!')
        } else {
            toast.error('Please buy one of the packages!')
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let inputValue = e.target.comment.value;
        const newComment = { Name: user?.displayName, Description: inputValue }
        console.log(newComment)
        const data = await addComment(meal._id, newComment)
        console.log(data)
        const newReviews = [...userComment, newComment]
        setUserComment(newReviews)

    }

    return (

        <div className="mx-4 lg:mx-20 my-8">
            <div className="flex flex-col lg:flex-row border shadow-lg rounded-md p-4 gap-4">
                <div className="flex-1">
                    <img src={meal.MealImage} className="rounded-md lg:h-full" alt="" />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col grow">
                        <div className="flex gap-2 mb-2">
                            <p className="bg-indigo-500 px-1 text-white rounded-md">Distributor</p>
                            <p className="text-slate-500 font-semibold">{`${meal.AdminName}`}</p>
                        </div>
                        <p className="font-bold text-2xl text-[#f16667]">{`${meal.MealTitle}`}</p>
                        <p>{`${meal.Description}`}</p>
                        <p className="mt-2 text-slate-600"><span className="text-indigo-700 font-medium">Ingredients:</span> {`${meal.Ingredients}`}</p>
                        <div className="mt-2 items-center flex gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>

                            <p>{`${meal.Rating}`}</p>
                        </div>
                        <p>Likes: {meal.Likes}</p>
                        <p className="mt-2">Post Date: {meal.PostTime}</p>

                    </div>
                    <div className="flex justify-around items-center">
                        <button onClick={handleLike}>{isClick ? < FcLike className="text-4xl" /> : <FcLikePlaceholder className="text-4xl" />}</button>
                        <button onClick={handleRequest} className="bg-indigo-500 hover:bg-indigo-700 px-2 py-1 text-white rounded-lg">Request Meal</button>
                    </div>
                </div>
            </div>
            <p className="my-4 text-xl text-indigo-600 font-semibold">Reviews</p>
            {
                userComment.map(review =>
                    <div className="my-4">
                        <p>{review.Name}</p>
                        <p className="text-slate-500">{review.Description}</p>
                    </div>
                )
            }
            <div className="py-8">
                <h1 className="mb-6 text-xl text-indigo-700 font-semibold">Add Review:</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input name="comment" type="text-area" required className="textarea textarea-primary lg:w-1/2 w-full" />
                    <input type="submit" value="comment" className="bg-indigo-500 hover:bg-indigo-700 px-2 py-1 text-white rounded-lg w-fit mt-2" />
                </form>


            </div>
        </div>
    );
};

export default MealDetails;