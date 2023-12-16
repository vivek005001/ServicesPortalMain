import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./Firebase"; // Import the auth object from your firebase.js file

const LoginModal = ({ onClose }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      console.log("User signed in successfully");

      // You can add more logic here, such as redirecting or updating the UI
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Handle errors, such as displaying an error message to the user
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully", result.user);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      // Handle errors, such as displaying an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96 text-center relative">
        <IoCloseSharp
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800"
          size={24}
        />
        <h6 className="text-xl font-bold mb-4 text-black">Login to your account</h6>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="loginEmail"
            >
              Email
            </label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="loginPassword"
            >
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Login
          </button>
          <p className="text-gray-700 my-2">OR</p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 focus:outline-none"
          >
            Login with Google
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginModal;
