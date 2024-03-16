import { useForm } from "react-hook-form";
import { uploadImage } from "../../../hooks/uploadImage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addMeal, addUpcomingMeal } from "../../../hooks/auth";

const AddMeal = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
    const onSubmit = async(data) => {
        console.log(data);
        const img = data?.MealImage[0]
        const imgData = await uploadImage(img)
        const MealTitle = data?.MealTitle
        const MealType = data?.MealType
        const MealImage = imgData?.data?.display_url
        const Ingredients = data?.Ingredients
        const Description = data?.Description
        const Price = parseFloat(data?.Price)
        const Rating = parseFloat(data?.Rating)
        const PostTime = data?.PostTime
        const AdminName = data?.AdminName
        const AdminEmail = data?.AdminEmail
        const Likes = 0
        const Reviews = []
        const newMeal = {MealTitle, MealType, MealImage, Ingredients, Description, Price, Rating, PostTime, AdminName, AdminEmail, Likes, Reviews}
        console.log(newMeal);

        try {
            await addMeal(newMeal)
            toast.success('Successfully added')
            navigate('/dashboard/addMeal')
        } catch (error) {
            console.log(error);
            toast.error('Something is wrong')
        }

    }

    const handleUpcoming = async(data) => {
        const img = data?.MealImage[0]
        const imgData = await uploadImage(img)
        const MealTitle = data?.MealTitle
        const MealType = data?.MealType
        const MealImage = imgData?.data?.display_url
        const Ingredients = data?.Ingredients
        const Description = data?.Description
        const Price = parseFloat(data?.Price)
        const Rating = parseFloat(data?.Rating)
        const PostTime = data?.PostTime
        const AdminName = data?.AdminName
        const AdminEmail = data?.AdminEmail
        const Likes = 0
        const Reviews = []
        const newMeal = {MealTitle, MealType, MealImage, Ingredients, Description, Price, Rating, PostTime, AdminName, AdminEmail, Likes, Reviews}
        console.log(newMeal);

        try {
            await addUpcomingMeal(newMeal)
            toast.success('Successfully added')
            navigate('/dashboard/upcomingMeals')
        } catch (error) {
            console.log(error);
            toast.error('Something is wrong')
        }
    }

    return (
        <div className="w-3/4 lg:w-1/2 mx-auto border shadow-lg p-6 rounded-lg ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4 p-2">
                <h2 className="text-3xl text-center mb-8 font-bold text-[#f16667]">Add Meal</h2>
                <div>
                    <input {...register("MealTitle", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Meal Title" />
                    {errors.MealTitle && <span className='text-red-600'>Meal title is required</span>}
                </div>
                <div>
                    <input {...register("MealType", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Meal Type" />
                    {errors.MealType && <span className='text-red-600'>Meal type is required</span>}
                </div>
                <div>
                    <input {...register("MealImage", { required: true })} className="p-2 rounded-lg border w-full" type="file" placeholder="Meal Image" />
                    {errors.MealImage && <span className='text-red-600'>Meal Image is required</span>}
                </div>
                <div>
                    <input {...register("Ingredients", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Ingredients" />
                    {errors.Ingredients && <span className='text-red-600'>Ingredients is required</span>}
                </div>
                <div>
                    <input {...register("Description", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Description" />
                    {errors.Description && <span className='text-red-600'>Description is required</span>}
                </div>
                <div>
                    <input {...register("Price", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Price" />
                    {errors.Price && <span className='text-red-600'>Price is required</span>}
                </div>
                <div>
                    <input {...register("Rating", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Rating" />
                    {errors.Rating && <span className='text-red-600'>Rating is required</span>}
                </div>
                <div>
                    <input {...register("PostTime", { required: true })} className="p-2 rounded-lg border w-full" type="date" placeholder="PostTime" />
                    {errors.PostTime && <span className='text-red-600'>PostTime is required</span>}
                </div>
                <div>
                    <input {...register("AdminName", { required: true })} className="p-2 rounded-lg border w-full" type="text" placeholder="Admin Name" />
                    {errors.AdminName && <span className='text-red-600'>Admin Name is required</span>}
                </div>
                <div>
                    <input {...register("AdminEmail", { required: true })} className="p-2 rounded-lg border w-full" type="email" placeholder="Admin Email" />
                    {errors.AdminEmail && <span className='text-red-600'>Admin Email is required</span>}
                </div>
                
                
                <button className="p-2 mt-8 rounded-lg border font-semibold border-[#f16667] hover:bg-[#f16667] hover:text-white">Add To Meals</button>

                <button onClick={handleSubmit(handleUpcoming)} className="p-2 mt-4 rounded-lg border font-semibold border-[#f16667] hover:bg-[#f16667] hover:text-white">Add To Upcoming Meals</button>

            </form>
        </div>
    );
};

export default AddMeal;