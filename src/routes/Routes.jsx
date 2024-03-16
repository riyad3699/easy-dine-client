import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Meals from '../pages/Meals'
import UpcomingMeals from '../pages/UpcomingMeals'
import Dashboard from '../layouts/Dashboard'
import MyProfile from '../pages/Dashboard/UserDashboard/MyProfile'
import UserReviews from '../pages/Dashboard/UserDashboard/UserReviews'
import RequestedMeals from '../pages/Dashboard/UserDashboard/RequestedMeals'
import AdminProfile from '../pages/Dashboard/adminDashboard/AdminProfile'
import ManageUsers from '../pages/Dashboard/adminDashboard/ManageUsers'
import AddMeal from '../pages/Dashboard/adminDashboard/AddMeal'
import ServeMeals from '../pages/Dashboard/adminDashboard/ServeMeals'
import Upcoming from '../pages/Dashboard/adminDashboard/Upcoming'
import AllMeals from '../pages/Dashboard/adminDashboard/AllMeals'
import AllReviews from '../pages/Dashboard/adminDashboard/AllReviews'
import PrivateRoute from '../routes/PrivateRoute'
import MealDetails from '../pages/MealDetails'
import { getMeal } from '../hooks/auth'
import Payment from '../pages/Payment'
import UpdateMeal from '../pages/UpdateMeal'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/meals',
        element: <Meals></Meals>
      },
      {
        path: `/meals/:id`,
        element: <PrivateRoute><MealDetails></MealDetails></PrivateRoute>,
        loader: ({params}) => getMeal(params.id)
      },
      {
        path: '/upcomingMeals',
        element: <UpcomingMeals></UpcomingMeals>
      }
    ],
  },


  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'myReviews',
        element: <UserReviews></UserReviews>
      },
      {
        path: 'requestedMeals',
        element: <RequestedMeals></RequestedMeals>
      },
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'addMeal',
        element: <AddMeal></AddMeal>
      },
      {
        path: 'serveMeals',
        element: <ServeMeals></ServeMeals>
      },
      {
        path: 'upcomingMeals',
        element: <Upcoming></Upcoming>
      },
      {
        path: 'allMeals',
        element: <AllMeals></AllMeals>
      },
      {
        path: 'allReviews',
        element: <AllReviews></AllReviews>
      },
      {
        path: 'allMeals/update/:id',
        element: <UpdateMeal></UpdateMeal>,
        loader: ({params}) => getMeal(params.id)
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

  {
    path: '/checkout/silver',
    element: <Payment badge="Silver"></Payment>
  },
  {
    path: '/checkout/gold',
    element: <Payment badge="Gold"></Payment>
  },
  {
    path: '/checkout/platinum',
    element: <Payment badge="Platinum"></Payment>
  }
])
