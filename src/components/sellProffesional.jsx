import React from "react";
import { db  } from "../assets/Firebase";

const [professionalInfo, setProfessionalInfo] = useState({
    Occupation: "",
    Skills: "",
    SkillLevel: "",
    WebsiteLink: "",
    GitHubLink: ""
  })

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
function Sell_pro(){

    return(
    <>
    <div>
      <h1 className="text-5xl font-bold ml-10">Proffesional Info</h1>
      <form className="mt-5 ml-5" onSubmit={handleSubmit} name="sell_proffes">
      <label className="ml-5 mt-5">SELECT A OCCUPATION:</label>
      <select id="dropdown" name="Occupation" className="ml-5 mt-5">
          <option value="Web Developer" className="text-black" onChange={handleProfessionalChange}>Web Developer</option>
          <option value="Video Editor" className="text-black"  onChange={handleProfessionalChange}>Video Editor</option>
          <option value="Digital Marketing" className="text-black"  onChange={handleProfessionalChange}>Digital Marketing</option>
          <option value="Photo Editor" className="text-black"  onChange={handleProfessionalChange}>Photo Editor</option>
          <option value="Graphic and Design" className="text-black"  onChange={handleProfessionalChange}>Graphic and Design</option>
          <option value="Writing and Translation" className="text-black"  onChange={handleProfessionalChange}>Writing and Translation</option>
          <option value="Sound Editor" className="text-black"  onChange={handleProfessionalChange}>Sound Editor</option>
          <option value="Programming and Tech" className="text-black"  onChange={handleProfessionalChange}>Programming and Tech</option>
          <option value="Business" className="text-black"  onChange={handleProfessionalChange}>Business</option>
          <option value="Data" className="text-black"  onChange={handleProfessionalChange}>Data</option>
          <option value="Photography" className="text-black"  onChange={handleProfessionalChange}>Photography</option>
          <option value="Video and Animation" className="text-black"  onChange={handleProfessionalChange}>Video and Animation</option>
      </select><br/>
      <label  className="ml-5 mt-5">SKILLS :</label>
      <input type="text" className="text-black ml-5 mt-5"  onChange={handleProfessionalChange}/>
      <select id="dropdown" name="Occupation" className="ml-5 mt-5">
          <option value="beginner" className="text-black"  onChange={handleProfessionalChange}>BEGINNER</option>
          <option value="Intermediate" className="text-black"  onChange={handleProfessionalChange}>INTERMEDIATE</option>
          <option value="Expert" className="text-black"  onChange={handleProfessionalChange}>EXPERT</option>
          {/* <option value="Sound Editor" className="text-black">Sound Editor</option> */}
      </select><br/>
      <label  className="ml-5 mt-5">WEBSITE LINK :</label>
      <input type="text" className="text-black ml-5 mt-5"  onChange={handleProfessionalChange}/><br/>
      <label  className="ml-5 mt-5"  onChange={handleProfessionalChange}>GITHUB LINK :</label>
      <input type="text" className="text-black ml-5 mt-5"  onChange={handleProfessionalChange}/><br/>
      <button className="ml-5 mt-5" type="submit">SAVE</button>
      </form>
    </div> 
    </>
    );
}

export default Sell_pro;