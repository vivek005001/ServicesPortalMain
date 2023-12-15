import React from "react";
import logo from "../images/Name_logo.png";

function Navbar() {
  return (
    <nav>
      <div className="flex-row bg-blue-300">
        <div className="flex items-center flex-1">
          <img src={logo} alt="logo" style={{ width: '100px' }} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
