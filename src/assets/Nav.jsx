// Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/Name_logo.png";
import { BsSearch, BsMic } from "react-icons/bs";
import LoginModal from "./LoginModal";
import SignupModal from "./SignUpModal";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    setIsScrolled(currentScrollPosition > 0);
    setScrollPosition(currentScrollPosition);

    // Show/hide search bar based on scroll position and homepage
    setShowSearchBar(
      currentScrollPosition > window.innerHeight * 0.5 &&
      (location.pathname === "/" || location.pathname === "/sell")
    );
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const headerColor = isScrolled ? "bg-black" : "bg-black";
  const textColor = isScrolled ? "text-white" : "text-white";
  const isHome = location.pathname === "/";

  return (
    <header className={`sticky top-0 w-full ${headerColor} z-50`}>
      <div className={`flex items-center p-4 py-8 mb-10 mt-2 h-14 mx-auto max-w-7xl ${textColor}`}>
        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="logo" className="w-40 pr-2 my-1 ml-2" />
        </Link>
        {(isHome || location.pathname === "/sell") && (
          <div className={`relative flex items-center ${showSearchBar ? 'visible' : 'hidden'}`}>
            <button className={`rounded ml-2 ${textColor}`}>
              <BsMic />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className={`mr-2 ml-2 h-8 w-96 p-2 rounded border bg-inherit relative border-color-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 ${textColor}`}
            />
            <button
              className={`h-8 ml-0 px-2 py-1 rounded transition-transform transform active:scale-95 focus:outline-none ${textColor} bg-red-500`}
            >
              <BsSearch />
            </button>
          </div>
        )}
        {!isHome && (
          <div className="relative flex items-center visible"> {/* Always visible on other tabs */}
            <button className={`rounded ml-2 ${textColor}`}>
              <BsMic />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className={`mr-2 ml-2 h-8 w-96 p-2 rounded border bg-inherit relative border-color-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 ${textColor}`}
            />
            <button
              className={`h-8 ml-0 px-2 py-1 rounded transition-transform transform active:scale-95 focus:outline-none ${textColor} bg-red-500`}
            >
              <BsSearch />
            </button>
          </div>
        )}
        <div className="flex justify-end items-center flex-grow ml-4">
          {isHome ? (
            <Link
              to="/sell"
              className={`mx-2 h-8 px-6 py-1 rounded transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor} bg-red-500`}
            >
              Add Service
            </Link>
          ) : (
            <Link
              to="/"
              className={`mx-2 h-8 px-6 py-1 rounded transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor} bg-transparent`}
            >
              Home
            </Link>
          )}
          {currentUser ? (
            <>
              <div className={`mx-2 h-8 px-4 py-1 rounded ${textColor}`}>
                {currentUser.displayName}
              </div>

              <button
                onClick={handleLogout}
                className={`mx-2 h-8 px-4 py-1 rounded-full hover:bg-transparent transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor}`}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-500 text-white flex items-center justify-center">
                    {currentUser.displayName &&
                      currentUser.displayName.charAt(0)}
                  </div>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openLoginModal}
                className={`mx-2 h-8 px-4 py-1 rounded hover:bg-red-500 transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor}`}
              >
                Login
              </button>
              <button
                onClick={openSignUpModal}
                className={`mx-2 h-8 px-4 py-1 rounded hover:bg-red-500 transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor}`}
              >
                SignUp
              </button>
            </>
          )}
        </div>

        {showLoginModal && <LoginModal onClose={closeModals} />}
        {showSignUpModal && <SignupModal onClose={closeModals} />}
      </div>
    </header>
  );
}

export default Navbar;
