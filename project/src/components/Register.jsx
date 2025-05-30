import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 409) {
        const data = await response.json();
        setError(data.message || 'Этот email уже зарегистрирован');
        return;
      }


       if (response.status === 400) {
        const data = await response.json();
        setError(data.message || 'Email was repeated ');
        return;
      }

       if (response.status === 401) {
        const data = await response.json();
        setError(data.message || 'Password should be more than 8 symbols ');
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to connect to server');
    }
  };

  return (
    <section className="vh-100 vw-100 d-flex justify-content-center align-items-center gradient-form" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="container-fluid h-100">
        <div className="row d-flex vw-100 vh-100 justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 vh-100 d-flex justify-content-center align-items-center">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">Create Your Account</h4>
                    </div>
                    <form onSubmit={handleRegister} className='col-lg-6 mx-auto'>
                      <p>Please register to continue</p>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label className="form-label">Name</label>
                      </div>

                      <div className="form-outline-gradient mb-4">
  <input
    type="email"
    className="form-control input-with-gradient"
    placeholder="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <label className="form-label">Email address</label>
</div>

                      <div className="form-outline mb-4">
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
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h1 className="mb-4">Join us today</h1>
                    <h3 >
                      Create your account to access the system. Stay organized and connected with our easy-to-use platform.
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
