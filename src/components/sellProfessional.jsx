import React, { useState } from "react";
import { db } from "../assets/Firebase";
import { useNavigate } from "react-router-dom";

function Sell_pro() {
  const [professionalInfo, setProfessionalInfo] = useState({
    Occupation: "",
    Skills: "",
    SkillLevel: "",
    WebsiteLink: "",
    GitHubLink: "",
  });

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usersRef = db.ref("users");

    const newUserRef = usersRef.push({
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
  };

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold ml-10">Professional Info</h1>
        <form className="mt-5 ml-5" onSubmit={handleSubmit} name="sell_proffes">
          {/* Professional Info input boxes */}
          <label className="ml-5 mt-5">SELECT A OCCUPATION:</label>
          <select id="dropdown" name="Occupation" className="ml-5 mt-5" onChange={handleProfessionalChange}>
            <option value="Web Developer" className="text-black">Web Developer</option>
            <option value="Video Editor" className="text-black">Video Editor</option>
            <option value="Digital Marketing" className="text-black">Digital Marketing</option>
            <option value="Photo Editor" className="text-black">Photo Editor</option>
            <option value="Graphic and Design" className="text-black">Graphic and Design</option>
            <option value="Writing and Translation" className="text-black">Writing and Translation</option>
            <option value="Sound Editor" className="text-black">Sound Editor</option>
            <option value="Programming and Tech" className="text-black">Programming and Tech</option>
            <option value="Business" className="text-black">Business</option>
            <option value="Data" className="text-black">Data</option>
            <option value="Photography" className="text-black">Photography</option>
            <option value="Video and Animation" className="text-black">Video and Animation</option>
          </select><br />
          <label className="ml-5 mt-5">SKILLS :</label>
          <input type="text" className="text-black ml-5 mt-5" onChange={handleProfessionalChange} />
          <select id="dropdown" name="Occupation" className="ml-5 mt-5" onChange={handleProfessionalChange}>
            <option value="beginner" className="text-black">BEGINNER</option>
            <option value="Intermediate" className="text-black">INTERMEDIATE</option>
            <option value="Expert" className="text-black">EXPERT</option>
          </select><br />
          <label className="ml-5 mt-5">WEBSITE LINK :</label>
          <input type="text" className="text-black ml-5 mt-5" onChange={handleProfessionalChange} /><br />
          <label className="ml-5 mt-5">GITHUB LINK :</label>
          <input type="text" className="text-black ml-5 mt-5" onChange={handleProfessionalChange} /><br />
          <button className="ml-5 mt-5" type="submit">SAVE</button>
        </form>
      </div>
    </>
  );
}

export default Sell_pro;
