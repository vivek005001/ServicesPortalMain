import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navbar from "./assets/Nav";
import Sell_p from "./components/SellPersonal";
import Home from "./components/Home";
import LoginModal from "./assets/LoginModal";
import SignupModal from "./assets/SignUpModal";

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

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

  return (
    <>
      <BrowserRouter>
        <Navbar openLoginModal={openLoginModal} openSignupModal={openSignupModal} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sell' element={<Sell_p />} />
        </Routes>
        <ToastContainer />
        {isLoginModalOpen && <LoginModal onClose={closeModals} onSignupRedirect={openSignupModal} />}
        {isSignupModalOpen && <SignupModal onClose={closeModals} onLoginRedirect={openLoginModal} />}
      </BrowserRouter>
    </>
  );
}

export default App;
