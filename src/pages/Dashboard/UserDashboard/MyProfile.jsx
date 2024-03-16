import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import Bronze from "../../../assets/images/bronze.png"
import Gold from "../../../assets/images/gold.png"
import Silver from "../../../assets/images/silver.png"
import Platinum from "../../../assets/images/platinum.png"

const MyProfile = () => {
    const [users, refetch] = useUser();
    const { user } = useAuth();

    const currentUser = users?.find(u => u.email === user?.email);
    console.log(currentUser);
    console.log(users)
    let badgeImg = Silver
    if (currentUser?.status === "Platinum") {
        badgeImg = Platinum
    } else if (currentUser?.status === "Gold") {
        badgeImg = Gold
    }

    return (
        <div className="flex gap-4 mt-16 justify-center items-center">
            <div>
                <img className="rounded-full p-1 border-2 w-32 h-32 border-indigo-700" src={user?.photoURL} alt="" />
            </div>
            <div>
                <div> 
                    <p className="bg-indigo-500 px-2 rounded-md mx-auto mb-1 w-fit text-sm text-white">Badges</p>
                </div>
                <div className="flex justify-center gap-2 mb-2">
                    <img className="rounded-full w-12 h-12" src={Bronze} alt="" />
                    {
                        currentUser?.status != 'Bronze' && <img className="rounded-full w-12 h-12" src={badgeImg} alt="" />
                    }
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-indigo-700">{user?.displayName}</p>
                    <p className="text-slate-600">Email: {currentUser?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;