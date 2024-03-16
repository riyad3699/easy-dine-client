import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import { getToken, saveUser } from '../../hooks/auth';
import { uploadImage } from '../../hooks/uploadImage';
import Swal from 'sweetalert2';

const SignUp = () => {
  const navigate = useNavigate()
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data);
    const img = data.profilePic[0]
    const imgData = await uploadImage(img)
    await createUser(data.email, data.password)
      .then(async res => {
        const loggedUser = res.user
        console.log(loggedUser)
        await updateUserProfile(data?.name, imgData?.data?.display_url)
        navigate('/')
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully!",
          icon: "success"
        });

        const savedUser = await saveUser(loggedUser)
        console.log(savedUser)

        getToken(loggedUser?.email)
        navigate('/')

      })
      .catch(error => {
        console.log(error)
      })
  }


  const handleSignInWithGoogle = async () => {
    signInWithGoogle()
      .then(async (result) => {
        await saveUser(result?.user)
        await getToken(result?.user?.email)
        navigate('/');
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully!",
          icon: "success"
        });
      })
      .catch()
  }

  return (
    <div className="w-3/4 lg:w-1/3 mx-auto border shadow-lg p-6 rounded-lg my-16">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4 p-2">
        <h2 className="text-3xl text-center mb-8 font-bold text-[#f16667]">Register Here</h2>
        <div>
          <input {...register("name", { required: true })} className="p-2 rounded-lg border w-full" type="text" name="name" placeholder="Your Name" />
          {errors.name && <span className='text-red-600'>Name is required</span>}
        </div>
        <div>
          <input {...register("profilePic", { required: true })} className="p-2 rounded-lg border w-full" type="file" placeholder="Profile Picture" />
          {errors.profilePic && <span className='text-red-600'>Profile Picture is required</span>}
        </div>
        <div>
          <input {...register("email", { required: true })} className="p-2 rounded-lg border w-full" type="email" name="email" placeholder="Your Email" />
          {errors.email && <span className='text-red-600'>Email is required</span>}
        </div>
        <div>
          <input {...register("password", { required: true, minLength: 6, maxLength: 15, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/ })} className="p-2 rounded-lg border w-full" type="password" name="password" placeholder="Password" />
          {errors.password?.type === "required" && <span className='text-red-600'>Password is required</span>}
          {errors.password?.type === "minLength" && <span className='text-red-600'>Password should be at least 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className='text-red-600'>Password should be not more than 15 characters</span>}
          {errors.password?.type === "pattern" && <span className='text-red-600'>Password should carry lowercase, uppercase, special characters and number</span>}
        </div>
        <button className="p-2 mt-8 rounded-lg border font-semibold border-[#f16667] hover:bg-[#f16667] hover:text-white">Sign Up</button>
        <button onClick={handleSignInWithGoogle} className="p-2 mt-8 rounded-lg border font-semibold border-[#f16667] hover:bg-[#f16667] hover:text-white">SIGN IN WITH GOOGLE</button>
        <p className="text-center">Already have an account? <Link className="text-[#f16667] hover:underline" to='/login'>Login</Link> here</p>

      </form>
    </div>
  )
}

export default SignUp
