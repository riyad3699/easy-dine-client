import { addLikedMeal, addUpcomingLike } from "../hooks/auth";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";


const UpcomingMealCard = ({ meal }) => {
    const [users] = useUser();
    const {user} = useAuth()
    const { MealTitle, MealImage, Likes, Price, Rating, _id } = meal;


    const currentUser = users?.find(u => u?.email === user?.email);

    let isClick = false;

    if (currentUser?.likedMeals.includes(MealTitle)) {
        isClick = true;
    }

    const handleLike = async () => {
        console.log(MealTitle);
        const meal_title = MealTitle
        if (!currentUser.likedMeals.includes(MealTitle)) {
            try {
                const res = await addLikedMeal(currentUser?.email, { meal_title })
                console.log(res)
                await addUpcomingLike(_id)
                isClick = true

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <div className="block rounded-lg p-4 shadow-lg shadow-indigo-100">
                <img
                    alt="Home"
                    src={MealImage}
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Price</dt>

                            <dd className="text-sm text-gray-500">${Price}</dd>
                        </div>

                        <div>
                            <dt className="sr-only">Address</dt>

                            <dd className="font-medium">{MealTitle}</dd>

                            <p className="text-indigo-700 font-medium"><span className="font-medium text-slate-600 text-sm">Likes:</span> {Likes}</p>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center justify-between gap-8 text-xs">


                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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

                            <div className="mt-1.5 sm:mt-0">
                                <p className="font-medium">{Rating}</p>
                            </div>
                        </div>
                        <button onClick={handleLike}>{isClick ? < FcLike className="text-4xl" /> : <FcLikePlaceholder className="text-4xl" />}</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealCard;