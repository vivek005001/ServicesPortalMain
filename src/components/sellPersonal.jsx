// SellPersonal.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../assets/Firebase";
import { Link } from "react-router-dom";

function SellCombined() {
  const [user, setPersonalInfo] = useState({
    First_Name: "",
    Last_Name: "",
    Display_Name: "",
    Profile_picture: "",
    Description: "",
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    Occupation: "",
    Skills: "",
    SkillLevel: "",
    WebsiteLink: "",
    GitHubLink: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(true);

  useEffect(() => {
    // Check if a user is currently logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Redirect the user to the login page or handle authentication state
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      console.log("User is not logged in");
      return;
    }

    // Save personalInfo to Firebase or perform any other actions
    // ...

    // After saving, switch to the professionalInfo form
    setShowPersonalForm(false);
  };

  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      console.log("User is not logged in");
      return;
    }

    const usersRef = db.ref("users");

    try {
      // Push the user data to the "users" collection in Firebase
      const newUserRef = await usersRef.push({
        ...user,
        professionalInfo: {
          ...professionalInfo,
        },
      });

      const userId = newUserRef.key;

      // Optionally, you can perform additional actions after submitting to Firebase

      // Redirect or navigate to the next page (e.g., "/sellPro")
      // This depends on your routing setup
      // Replace the following line with your actual routing logic
      window.location.href = "/sellPro";
    } catch (error) {
      console.error("Error submitting data to Firebase:", error.message);
      // Handle errors, such as displaying an error message to the user
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          {showPersonalForm ? (
            <>
              <h1 className="text-5xl font-bold ml-10">Personal Info</h1>
              <form className="mt-5 ml-10" onSubmit={handlePersonalSubmit}>
                {/* Personal Info input boxes */}
                FULL NAME
                <input
                  name="First_Name"
                  placeholder="FIRST NAME"
                  value={user.First_Name}
                  onChange={handlePersonalChange}
                  className="text-black rounded pl-2 pt-1 pb-2 ml-5 text-1xl mt-5"
                  type="text"
                />
                <input
                  name="Last_Name"
                  placeholder="LAST NAME"
                  value={user.Last_Name}
                  onChange={handlePersonalChange}
                  className="text-black rounded ml-5 pl-2 pt-1 pb-2 text-1xl mt-5"
                  type="text"
                />
                <br />
                DISPLAY NAME
                <input
                  name="Display_Name"
                  value={user.Display_Name}
                  placeholder="DISPLAY NAME"
                  onChange={handlePersonalChange}
                  className="text-black rounded pl-2 pt-1 pb-2 ml-5 text-1xl mt-5"
                  type="text"
                />
                <br />
                PROFILE PICTURE :{" "}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  value={user.Profile_picture}
                  onChange={handlePersonalChange}
                  name="profile_pic"
                  className="mt-5 mb-5"
                />
                <br />
                DESCRIPTION :<br />
                <textarea
                  rows="10"
                  cols="100"
                  value={user.Description}
                  placeholder="Write your description here"
                  name="description"
                  onChange={handlePersonalChange}
                  className="mt-5"
                />
                <Link to="/sellPro">
                  <button
                    type="submit"
                    className="ml-10 mb-10"
                    name="submit_btn"
                  >
                    CONTINUE
                  </button>
                </Link>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold ml-10">Professional Info</h1>
              <form
                className="mt-5 ml-5"
                onSubmit={handleProfessionalSubmit}
                name="sell_proffes"
              >
                {/* Professional Info input boxes */}
                {/* ... (rest of your professional info form) */}
                <button className="ml-5 mt-5" type="submit">
                  SAVE
                </button>
              </form>
            </>
          )}
        </>
      ) : (
        <div className="ml-10 mt-5 text-red-500">
          Please log in to make changes.
        </div>
      )}
    </div>
  );
}

export default SellCombined;