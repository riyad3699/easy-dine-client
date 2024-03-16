import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const Dashboard = () => {
    const { user } = useAuth();
    const [users] = useUser();
    const currentUser = users.find(u => u?.email === user?.email);
    return (
        <div className="flex flex-col">

            <div className="drawer z-10 w-full">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="fixed drawer-button"><svg className="w-10 mx-4 lg:mx-8 h-8 p-1 rounded-lg hover:bg-slate-400 m-2" xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 92 92" id="menu"><path d="M78 23.5H14c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5h64c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5zM84.5 46c0-3.6-2.9-6.5-6.5-6.5H14c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5h64c3.6 0 6.5-2.9 6.5-6.5zm0 29c0-3.6-2.9-6.5-6.5-6.5H14c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5h64c3.6 0 6.5-2.9 6.5-6.5z"></path></svg></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="w-60 flex h-screen flex-col justify-between border-e bg-white">
                        {/* Sidebar content here */}

                        {
                            currentUser?.role === 'user' ?
                                <div className="px-4 py-6">
                                    <Link to={'/'}>
                                        <div className='flex items-center gap-1'>
                                            <img className='h-12 w-12' src="/logo.png" alt="" />
                                            <p className='text-2xl font-semibold text-[#f16667]'>EasyDine</p>
                                        </div>
                                    </Link>

                                    <ul className="mt-6 menu space-y-1">
                                        <li>
                                            <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/myProfile"}>My Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/requestedMeals"}>Requested Meals</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/myReviews"}>My Reviews</NavLink>
                                        </li>


                                    </ul>
                                </div>
                            :
                            <div className="px-4 py-6">
                            <Link to={'/'}>
                                <div className='flex items-center gap-1'>
                                    <img className='h-12 w-12' src="/logo.png" alt="" />
                                    <p className='text-2xl font-semibold text-[#f16667]'>EasyDine</p>
                                </div>
                            </Link>

                            <ul className="mt-6 menu space-y-1">
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/adminProfile"}>Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/manageUsers"}>Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/addMeal"}>Add Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/allMeals"}>All Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/allReviews"}>All Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/serveMeals"}>Serve Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'text-sm font-medium text-gray-500'} to={"/dashboard/upcomingMeals"}>Upcoming Meals</NavLink>
                                </li>


                            </ul>
                        </div>
                        }


                    
                        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                            <a className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                                <img
                                    alt="Man"
                                    src={user?.photoURL}
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-xs">
                                        <strong className="block font-medium">{user?.displayName}</strong>

                                        <span> {user?.email} </span>
                                    </p>
                                </div>
                            </a>
                        </div>

                    </ul>
                </div>
            </div>


            <div className="flex-1 z-0 my-12 mx-4 lg:mx-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;