import toast from "react-hot-toast";
import { makeAdmin } from "../../../hooks/auth";
import useUser from "../../../hooks/useUser";

const ManageUsers = () => {
    const [users, refetch] = useUser();

    const handleMakeAdmin = async(id) => {
        await makeAdmin(id)
        toast.success('Updated Successfully')
        refetch();
    }
   
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Make Admin</th>
                            <th>Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            users.map(user => 
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.role === 'admin'? 'Admin':<button onClick={()=> handleMakeAdmin(user._id)} className="text-sm bg-indigo-700 text-white px-2 rounded-lg">Make Admin</button>}</td>
                                    <td>{user.status}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;