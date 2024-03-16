import useAuth from "../../../hooks/useAuth";
import useMeals from "../../../hooks/useMeals";

const AdminProfile = () => {
    const { user } = useAuth();
    const [meals] = useMeals();

    const addedMeals = meals?.filter(meal => meal?.AdminEmail === user?.email);

    return (
        <div className="flex items-center justify-center mt-16">
            <div className="flex items-center gap-2">
                <div>
                    <img className="rounded-full p-1 border-2 w-32 h-32 border-indigo-700" src={user?.photoURL} alt="" />
                </div>
                <div>
                    <p className="text-indigo-700 font-medium">{`${user?.displayName}`}</p>
                    <p className="text-slate-500">{`${user?.email}`}</p>
                    <p className="text-indigo-700 font-bold"><span className="font-medium text-black">Number of meals added:</span> {addedMeals?.length}</p>
                </div>
            </div>
            
        </div>
    );
};

export default AdminProfile;