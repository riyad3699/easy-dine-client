import { Link, NavLink, useLocation } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import notificationImg from '../../../assets/images/notifications.png'
import useUser from '../../../hooks/useUser';


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [users] = useUser();
  const currentUser = users.find(u=> u?.email === user?.email);
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }

  const navLinks = <div className='flex flex-col lg:flex-row gap-4 items-center'>
    <NavLink className={location.pathname === '/' && 'bg-[#f16667] text-white px-3 py-1 rounded-lg text-center'} to='/'>Home</NavLink>
    <NavLink className={location.pathname === '/meals' && 'bg-[#f16667] text-white px-3 py-1 rounded-lg text-center'} to='/meals'>Meals</NavLink>
    <NavLink className={location.pathname === '/upcomingMeals' && 'bg-[#f16667] text-white px-3 py-1 rounded-lg text-center'} to='/upcomingMeals'>Upcoming Meals</NavLink>
  </div>

  return (
    <div className="navbar bg-gray-100 lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <div className='flex items-center gap-1'>
          <img className='h-12 w-12' src="/logo.png" alt="" />
          <p className='text-2xl font-semibold text-[#f16667]'>EasyDine</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <img className='w-[30px]' src={notificationImg} alt="" />
        {
          user ?
            <div className="flex items-center md:gap-2">
              <div className="dropdown dropdown-end">
                <label tabIndex={0}><img className="w-[40px] rounded-full cursor-pointer p-[2px] border-2 border-[#f16667]" src={user?.photoURL} /></label>
                <ul tabIndex={0} className="dropdown-content z-[1] flex flex-col items-center menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li className='p-2'>{user?.displayName}</li>
                  <li className='p-2'><Link to={currentUser?.role==='user'? '/dashboard/myProfile':'/dashboard/adminProfile'}>Dashboard</Link></li>
                  
                  <li><div><button onClick={handleLogOut} className="px-2 py-1 text-red-600 rounded-lg border font-medium hover:bg-[#f16667] hover:text-white">Log Out</button></div></li>
                </ul>
              </div>
            </div>
            :
            <Link to='/signup' className="px-3 py-1 rounded-lg border bg-[#f16667] text-white hover:bg-transparent hover:border-[#f16667]  hover:text-black">Join Us</Link>
        }

      </div>
    </div>
  )
}

export default Navbar
