import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './assets/Nav';
import Sell_p from './components/SellPersonal';
import Home from './components/Home';
import LoginModal from './assets/LoginModal';
import SignupModal from './assets/SignUpModal';

// Import your background image
import backgroundImage from './images/bg.jpg';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);

  const navigate = useNavigate();

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position to determine whether to show the search bar
      const isScrolledUp = window.scrollY < 100; // Adjust the threshold as needed
      setShowSearchBar(isScrolledUp);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Reset the search bar visibility when the route changes
    setShowSearchBar(true);
  }, [navigate]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative', // Needed for stacking the search bar
      }}
    >
      <Navbar
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        showSearchBar={showSearchBar}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell_p />} />
      </Routes>
      <ToastContainer />
      {isLoginModalOpen && <LoginModal onClose={closeModals} onSignupRedirect={openSignupModal} />}
      {isSignupModalOpen && <SignupModal onClose={closeModals} onLoginRedirect={openLoginModal} />}
    </div>
  );
}

export default App;
