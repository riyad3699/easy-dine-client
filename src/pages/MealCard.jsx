import { Link } from "react-router-dom";

const MealCard = ({ meal }) => {
    const { MealTitle, MealImage, Price, Rating, _id } = meal;

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
                        <Link to={`/meals/${_id}`}><button className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1 text-white rounded-lg">Details</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;