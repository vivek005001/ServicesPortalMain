// LoginModal.js

import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./Firebase"; // Import the auth object from your firebase.js file
import { db } from "./Firebase";
import { ref, update, get } from "firebase/database";

const LoginModal = ({ onClose }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in user with email and password
      const authResult = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      // Update the last login timestamp in the database
      updateLastLogin(authResult.user.displayName);
      console.log("User signed in successfully");

      // You can add more logic here, such as redirecting or updating the UI
      onClose(); // Close the modal after successful submission
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // User not found, prompt them to sign up
        const shouldSignUp = window.confirm("User not found. Do you want to sign up?");
        if (shouldSignUp) {
          signUpUser(); // Call the sign-up function
        }
      } else {
        console.error("Error signing in:", error.message);
        // Handle other errors, such as displaying an error message to the user
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      // Check if the user has a display name from Google
      const googleUser = result.user;
      if (googleUser.displayName) {
        // Update the last login timestamp in the database
        updateLastLogin(googleUser.displayName);
        
      } else {
        // Prompt the user to provide additional information
        // You can handle this according to your application's requirements
        console.log("Additional information needed for Google login");
      }

      console.log("User signed in with Google successfully", result.user);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      // Handle errors, such as displaying an error message to the user
    }
  };

  const updateLastLogin = async (username) => {
    // Check if the user exists in the database
    const userSnapshot = await get(ref(db, 'users/' + username));

    if (userSnapshot.exists()) {
      // User exists, update the last login timestamp
      update(ref(db, 'users/' + username), {
        lastLogin: Date.now(),
      });
    } else {
      // User doesn't exist, prompt them to sign up
      const shouldSignUp = window.confirm("User not found. Do you want to sign up?");
      if (shouldSignUp) {
        signUpUser(); // Call the sign-up function
      }
    }
  };

  const signUpUser = () => {
    // Implement your sign-up logic here
    console.log("Redirect or open signup modal");
    // Example: Redirect to the signup page
    // window.location.href = "/signup";
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
