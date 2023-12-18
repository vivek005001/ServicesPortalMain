import React, { useState } from "react";
import { db } from "../assets/Firebase"; // Make sure to provide the correct path to your firebase.jsx file
import Sell_pro from "./sellProffesional";
function SellPersonal() {
  const [user, setPersonalInfo] = useState({
    First_Name: "",
    Last_Name: "",
    Display_Name: "",
    Profile_picture : "",
    Description : "",
  });
  
  const [professionalInfo, setProfessionalInfo] = useState({
    Occupation: "",
    Skills: "",
    SkillLevel: "",
    WebsiteLink: "",
    GitHubLink: "",
  })

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usersRef = db.ref("users");

    const newUserRef = usersRef.push({
      ...personalInfo,
      professionalInfo: {
        ...professionalInfo,
      },
    });

    const userId = newUserRef.key;

  };

  return (
    <div>
      <h1 className="text-5xl font-bold ml-10">Personal Info</h1>
      <form className="mt-5 ml-10" onSubmit={handleSubmit}>
        FULL NAME
        <input
          name="First_Name"
          placeholder="FIRST NAME"
          value={user.First_Name}
          onChange={handlePersonalChange}
          className="text-black rounded pl-2 pt-1 pb-2 ml-5 text-1xl"
          type="text"
        />
        <input
          name="Last_Name"
          placeholder="LAST NAME"
          value={user.Last_Name}
          onChange={handlePersonalChange}
          className="text-black rounded ml-5 pl-2 pt-1 pb-2 text-1xl"
          type="text"
        ></input>
        DISPLAY NAME
        <input
          name="Display_Name"
          value={user.Display_Name}
          placeholder="DISPLAY NAME"
          onChange={handlePersonalChange}
          className="text-black rounded pl-2 pt-1 pb-2 ml-5 text-1xl"
          type="text"
        ></input>
        PROFILE PICTURE : <input type = "file" accept="image/jpeg,image/png" value ={user.Profile_picture} onchange ={handlePersonalChange}/>
        DESCRIPTION :
        <textarea rows = "10" cols ="100" value={user.Description} placeholder="Write your description here" />
        <button type="submit" className="ml-10">
        CONTINUE
        </button>
      </form>
      <Sell_pro
        professionalInfo={professionalInfo}
        onChange={handleProfessionalChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SellPersonal;
