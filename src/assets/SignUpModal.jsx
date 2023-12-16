import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./Firebase"; // Import the auth object from your firebase.js file
import { db } from "./Firebase";
import { set, ref } from "firebase/database";

const SignupModal = ({ onClose }) => {
  const [SignupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create or sign in user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        SignupData.email,
        SignupData.password
      );

      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: SignupData.username,
      });

      // Save user details to the database
      set(ref(db, 'users/' + SignupData.username), {
        username: SignupData.username,
        email: SignupData.email,
      });
      console.log("User created successfully");

      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle errors, such as displaying an error message to the user
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed up with Google successfully", result.user);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error signing up with Google:", error.message);
      // Handle errors, such as displaying an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 text-black bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96 text-center relative">
        <IoCloseSharp
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800"
          size={24}
        />
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="SignupUsername"
            >
              Username
            </label>
            <input
              type="text"
              id="SignupUsername"
              name="username"
              value={SignupData.username}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="SignupEmail"
            >
              Email
            </label>
            <input
              type="email"
              id="SignupEmail"
              name="email"
              value={SignupData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="SignupPassword"
            >
              Password
            </label>
            <input
              type="password"
              id="SignupPassword"
              name="password"
              value={SignupData.password}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none mx-auto"
          >
            Signup
          </button>
          <p className="text-gray-700 my-2">OR</p>
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 focus:outline-none mx-auto"
          >
            Signup with Google
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default SignupModal;
