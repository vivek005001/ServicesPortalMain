// Home.js
import React from "react";
import backgroundImage from "../images/bg.jpg"; // Replace with your image path

function Home() {
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-center items-start p-8"
      
    >
      <div className="w-911 h-214 flex-shrink-0">
        <h1 className="text-white font-montserrat font-bold text-6xl leading-none m-0">
          Freelancing Made <br /> Easy!
          
          
        </h1>
      </div>

      {/* Search bar */}
      <div className="mt-8 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="h-10 w-96 px-4 mr-4 rounded border bg-inherit border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-black"
        />
        <button className="h-10 px-4 py-2 rounded-full bg-red-500 text-white">
          Search
        </button>
      </div>
    </div>
    
    
    
  );
}

export default Home;
