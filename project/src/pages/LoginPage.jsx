import React, { useState } from 'react';
import Auth from '../components/Auth';
import Register from '../components/Register';
import './LoginPage.css';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="div-wrapper">
      {showLogin ? (
        <>
          <Auth />
           
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <button onClick={() => setShowLogin(false)} className="btn btn-link">
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p className="text-center mt-3">
            Already have an account?{' '}
            <button onClick={() => setShowLogin(true)} className="btn btn-link">
              Log in here
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
