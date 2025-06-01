import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
// import {API_BASE_URL} from '../config/api.js' 


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = "https://login-backend-production-d4d3.up.railway.app";
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);


      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('isBlocked', data.user.isBlocked ? 'true' : 'false');
      }


      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to server');
    }
  };

  return (
    <section className="vh-100 vw-100 d-flex justify-content-center align-items-center gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container-fluid h-100">
        <div className="row d-flex  vw-100 vh-100 justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 vh-100 d-flex justify-content-center align-items-center">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>
                    <div onClick={handleLogin} className='col-lg-6 mx-auto'>
                      <p>Please login to your account</p>

                      <div className="form-outline-gradient mb-4">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label">Email</label>
                      </div>

                      <div className="form-outline-gradient mb-4">
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>

                      {error && <div className="text-danger mb-3">{error}</div>}

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                          Log in
                        </button>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button type="button" onClick={() => navigate('/register')} className="btn btn-outline-danger" >Create new</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h1 className="mb-4">We are more than just a company</h1>
                    <h3 className="">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
