import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaPhoneAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const RegistrationForm = () => {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: "",
    password: '',
    confirmPAssword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate()

  // ------------ regex data
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // ------------ handeler
  const handelREgi = (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.phoneNumber || !formData.password) return alert('Fill All Field');
    if (!emailRegex.test(formData.email)) return alert('email is not valid');
    if (!passwordRegex.test(formData.password)) return alert('Choose Strong Password');

    setLoading(true);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: formData.userName,
          photoURL: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
        }).then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              navigate('/login')
              setLoading(false); 
              toast.info('Email send', {
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
        }).catch((error) => {
          setLoading(false); 
        });
      })
      .catch((error) => {
        setLoading(false); 
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          toast.warn('User Already Register', {
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
        }
      });
  };

  return (
    <div className="relative">
      {/*--------------- Loading */}
      {loading && (
        <div className="fixed inset-0 opacity-80 bg-green-100 z-50 flex items-center justify-center cursor-none">
          <h1 className="text-4xl font-extrabold text-black animate-pulse">LOADING</h1>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
        <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          </div>

          <form onSubmit={handelREgi} className="space-y-5">
            <div className="relative">
              <FaUserAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <FaPhoneAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <span
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account? <Link to={'/login'} className="text-indigo-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
