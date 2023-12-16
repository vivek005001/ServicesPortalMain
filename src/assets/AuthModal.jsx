// AuthModal.js
// NO need FOR NOW
import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';

const AuthModal = ({ onClose }) => {
  const [isLoginMode, setLoginMode] = useState(true);

  const handleToggleMode = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96 text-center relative">
        <IoCloseSharp
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800"
          size={24}
        />
        {isLoginMode ? (
          <LoginModal onClose={onClose} />
        ) : (
          <SignupModal onClose={onClose} />
        )}
        <button
          onClick={handleToggleMode}
          className="text-blue-500 hover:underline mt-2 cursor-pointer focus:outline-none"
        >
          {isLoginMode ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
