import useAxiosSecure from "./useAxiosSecure"


export const saveUser = async user => {
    const axiosSecure = useAxiosSecure();
    const currentUser = {
        name: user?.displayName,
        email: user?.email,
        role: 'user',
        status: 'Bronze',
        likedMeals: []
    }
    const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser)

    return data;
}

// token generate
export const getToken = async email => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.post('/jwt', email)
    console.log("token -----", data)

    return data;
}

// clear token
export const clearToken = async () => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.get('/logout');
    return data;

}
// user related api call
export const getAllUsers = async () => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.get("/users")
    return data;
}

export const makeAdmin = async (id) => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.put(`/users/user/${id}`)
    return data;
}

export const changeStatus = async (email, status) => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.put(`/user/${email}`, status);
    return data
}
// get meal
export const getMeal = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.get(`/meals/${id}`)
    return data
}

export const deleteMeal = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.delete(`/meals/${id}`)
    return data;
}


export const deleteUpcomingMeal = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.delete(`/upcomingMeals/${id}`)
    return data;
}


export const addLikedMeal = async (email, mealTitle) => {
    const axiosSecure = useAxiosSecure()
    console.log(mealTitle)
    const { data } = await axiosSecure.put(`/addLike/${ email }`, mealTitle)
    return data;
}
export const addLike = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.put(`/increase/${ id }`)
    return data;
}
export const addUpcomingLike = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.put(`/upcomingMeals/${ id }`)
    return data;
}

//requested meal
export const saveRequestedMeal = async (meal, user) => {
    const axiosSecure = useAxiosSecure();
    const requestedMeal = {
        meal_title: meal?.MealTitle,
        email: user?.email,
        user_name: user?.displayName,
        likes: meal?.Likes,
        reviews: meal?.Reviews?.length,
        status: 'Pending',
    }
    const { data } = await axiosSecure.post(`/requestedMeals`, requestedMeal)

    return data;
}

export const deleteRequestedMeal = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.delete(`/requestedMeals/${id}`)
    return data;
}

export const serveMeal = async id => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.put(`/requestedMeals/${id}`)
    return data;
}

// add meal
export const addMeal = async meal => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.post('/meals', meal)
    return data;
}


// comment
export const addComment = async (id, newComment) => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.put(`/addComment/${id}`, newComment)
    return data;
}

export const deleteComment = async (name, comment) => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.delete(`/comments/${name}/${comment}`)
}

export const updateComment = async (name, comment, newComment) => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.put(`/comments/${name}/${comment}`, newComment)
}

// update meal
export const updateMeal = async (meal, id) => {
    const axiosSecure = useAxiosSecure()
    const { data } = await axiosSecure.put(`/updateMeal/${id}`, meal)
    return data;
}

// add upcoming meal
export const addUpcomingMeal = async meal => {
    const axiosSecure = useAxiosSecure();
    const { data } = await axiosSecure.post('/upcomingMeals', meal)
    return data;
}
