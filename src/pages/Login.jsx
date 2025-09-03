import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UserInfo } from '../UserSlice';

const Login = () => {

  // ---------- auth method
const auth = getAuth();

  const [formData, setFormData] = useState({   email: '',  password: '',  });
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate()

  const disPatch =useDispatch()


  const [showPassword, setShowPassword] = useState(false); 
  // ------------ regex data
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handelLogin =(e)=>{
    e.preventDefault()
    if (!formData.email || !formData.password) return alert('Fill All Field');

    if (!emailRegex.test(formData.email)) return alert('email is not valid');
    if (!passwordRegex.test(formData.password)) return alert('Invalid Password');
    setLoading(true);

signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...

    if(user.emailVerified === false) return  alert('User Not Verified ')         
                  localStorage.setItem('userInfo' , JSON.stringify(user))

                  disPatch(UserInfo(user))
    navigate('/')
  })

  
  .catch((error) => {
        setLoading(false); 
    const errorCode = error.code;
    const errorMessage = error.message;
  
            toast.error('User Not Register', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
  });
  }
  
  return (
<div className=' relative'>

      {/*--------------- Loading */}
      {loading && (
        <div className="fixed inset-0 opacity-90 bg-green-100 z-50 flex items-center justify-center cursor-none">
          <h1 className="text-4xl font-extrabold text-black animate-pulse">LOADING</h1>
        </div>
      )}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        <form onSubmit={handelLogin} className="space-y-4">
          {/*------------ Email Input */}
          <div className="flex items-center border rounded px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
         onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              type="email"
              placeholder="Email"
              className="w-full focus:outline-none"
            />
          </div>

          {/*------------- Password  */}
          <div className="flex items-center border rounded px-3 py-2 relative">
            <FaLock className="text-gray-400 mr-2" />
            <input
         onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}

              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pr-10 focus:outline-none"
            />
            <span
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to={'/registraion'} className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
</div>

  );
};

export default Login;
