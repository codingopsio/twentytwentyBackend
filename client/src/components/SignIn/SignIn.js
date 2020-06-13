import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUpAnimation } from './../../utils/SignUp';
import './SignIn.css';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [responseError, setResponseError] = useState('');

  useEffect(() => {
    SignUpAnimation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/login', formData);
      console.log(response);

      setFormData({
        email: '',
        password: '',
      });
    } catch (err) {
      setResponseError(err.response.data.error);
      console.log(responseError);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-auth">
        <div className="img">
          <img src={require('../../img/save.svg')} alt="save" />
        </div>
        <div className="login-content">
          <form onSubmit={(e) => handleSubmit(e)}>
            <img src={require('../../img/avatar.svg')} alt="avatar" />
            <h2 className="title">Welcome Back</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={formData.email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  name="password"
                  value={formData.password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <Link to="/signup">Signup here </Link>
            <a href="/#"> Forgot Password?</a>
            {responseError ? (
              <span className="reserror">{responseError}</span>
            ) : null}
            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
