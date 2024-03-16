import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react';
import { getToken, saveUser } from '../../hooks/auth';


const Login = () => {

  const { signInWithGoogle, signIn } = useAuth();
  const [logInError, setLogInError] = useState(null);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    signInWithGoogle()
      .then(async(result) => {
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



  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setLogInError('');

    signIn(email, password)
      .then(result => {
        console.log(result.user);
        e.target.reset();
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully!",
          icon: "success"
        });
        navigate('/');
      })
      .catch(() => setLogInError("Email or Password doesn't match"))
  }




  return (
    <div className="w-3/4 lg:w-1/3 mx-auto border shadow-lg p-6 rounded-lg my-16">
      <form className="flex flex-col justify-center gap-4 p-2">
        <h2 className="text-3xl text-center mb-8 font-bold text-[#f16667]">Login Here</h2>
        <input className="p-2 rounded-lg border" type="email" name="email" placeholder="Your Email" required />
        <input className="p-2 rounded-lg border" type="password" name="password" placeholder="Password" required />
        <button onClick={handleLogin} className="p-2 mt-8 rounded-lg border font-semibold border-[#f16667] hover:bg-[#f16667] hover:text-white">Login</button>
        {logInError && <p className="text-center text-red-600">{logInError}</p>}
        <p className="text-center">Already have an account? <Link className="text-[#f16667] hover:underline" to='/signup'>Sign Up</Link> here</p>
        <button onClick={handleSignInWithGoogle} className="p-2 mt-8 rounded-lg border font-semibold border-[#f16667] hover:bg-[#f16667] hover:text-white">SIGN IN WITH GOOGLE</button>
      </form>
    </div>
  )
};
export default Login;
