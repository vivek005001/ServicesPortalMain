import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../assets/Firebase";
import LoginModal from "../assets/LoginModal";
import { ref, update } from "firebase/database";
import { db } from "../assets/Firebase";

function SellPersonal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setPersonalInfo] = useState({
    First_Name: "",
    Last_Name: "",
    Display_Name: "",
    Profile_picture: "",
    Description: "",
    Username: "",
    Email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setPersonalInfo((prevInfo) => ({
          ...prevInfo,
          Username: user.displayName || "",
          Email: user.email || "",
        }));
        setShowPersonalForm(true); // Show the form after successful login
      } else {
        setIsLoggedIn(false);
        setShowPersonalForm(false); // Hide the form when not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePersonalChange = (e) => {
    // Handle changes in the input fields
    const { name, value } = e.target;
    setPersonalInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    // ...
    const {
      First_Name,
      Last_Name,
      Display_Name,
      Profile_picture,
      Description,
      Username,
      Email,
    } = user;

    if (!isLoggedIn) {
      // Redirect to the login page
      navigate("/login");
      return;
    }

    // Assuming "users" is the collection in your database
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        First_Name,
        Last_Name,
        Display_Name,
        Profile_picture,
        Description,
        Username,
        Email, // Include the email in the request
      }),
    };

    const res = await fetch(
      "https://serviceportalmain-default-rtdb.firebaseio.com/UserData.json",
      options
    );

    console.log(res);

    if (res.ok) {
      console.log("Success");
      // Update the last login timestamp in Firebase
      const usernameRef = ref(db, "users/" + Username);
      update(usernameRef, {
        lastLogin: Date.now(),
      });
      // Continue with navigation or any other logic
      navigate("/sell_pro");
    } else {
      console.log("Failed");
    }

    // After successful submission, you can navigate to the desired page
    navigate("/sell_pro");
  };

  const closeModals = () => {
    setShowLoginModal(false);
    // Add logic to close other modals if needed
  };

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {isLoggedIn ? (
        <>
          {showPersonalForm ? (
            <>
              <h1 className="text-5xl font-bold ml-10 text-slate-600">
                Personal Info
              </h1>
              {/* add line */}
  
              <form className="mt-5 ml-10" onSubmit={handlePersonalSubmit}>
                {/* Personal Info input boxes */}
                <div className="flex">
                  <div className="mt-5">Full Name :</div>
                  <div className=" ml-40 pt-0 mt-0">
                    <input
                      name="First_Name"
                      placeholder="FIRST NAME"
                      value={user.First_Name}
                      onChange={handlePersonalChange}
                      className="border border-slate-600 text-white rounded pl-2 pt-1 pb-2 ml-5 text-1xl mt-5 bg-black mb-20"
                      type="text"
                      required
                    />
  
                    <input
                      name="Last_Name"
                      placeholder="LAST NAME"
                      value={user.Last_Name}
                      onChange={handlePersonalChange}
                      className="border border-slate-600 text-white rounded ml-5 pl-2 pt-1 pb-2 text-1xl mt-5 bg-black mb-20"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <br />
                <div className="flex">
                  <div className="mt-5">Nickname :</div>
                  <div className=" ml-40 pt-0 mt-0">
                    <input
                      name="Display_Name"
                      value={user.Display_Name}
                      placeholder="What should we call you?"
                      onChange={handlePersonalChange}
                      className="border border-slate-600 text-white rounded pl-2 pt-1 pb-2 ml-5 w-96 text-1xl mt-5 bg-black mb-20"
                      type="text"
                      style={{ color: "black" }}
                    />
                  </div>
                </div>
                <br />
  
                <div className="flex">
                  <div className="mt-5">Profile Picture :</div>
                  <div className="ml-40 pt-0 mt-0">
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      value={user.Profile_picture}
                      onChange={handlePersonalChange}
                      name="profile_pic"
                      className="border border-slate-600 mt-5 mb-20  bg-black"
                    />
                  </div>
                </div>
                <br />
                <div className="flex">
                  <div className="mt-5">Description :</div>
                  <div className="ml-40 pt-0 mt-0">
                    <textarea
                      rows="10"
                      cols="100"
                      // value={user.Description}
                      placeholder="Write your description here"
                      defaultValue=""
                      name="description"
                      onChange={handlePersonalChange}
                      className="border border-slate-600 mt-5 bg-black text-white mb-20"
                      readOnly={false}
                    />
                  </div>
                </div>
                <div className="flex justify-end pr-24">
                  <Link to="/sell_pro">
                    <button
                      type="submit"
                      className="ml-10 mb-10 bg-red-500 p-2 rounded text-white"
                      name="submit_btn"
                      onClick={handlePersonalSubmit}
                    >
                      CONTINUE
                    </button>
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-screen flex-col mb-1">
          <p className="text-xl mb-4 text-white">
            You are not logged in. Please login to continue.
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none"
          >
            Login
          </button>
        </div>
      )}
      {showLoginModal && <LoginModal onClose={closeModals} />}
    </div>
  );
  
}
export default SellPersonal;
