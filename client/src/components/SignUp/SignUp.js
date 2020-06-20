import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SignUpAnimation } from './../../utils/SignUp';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const SignUp = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [responseError, setResponseError] = useState('');

  useEffect(() => {
    SignUpAnimation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseError('');
    try {
      if (formData.password === formData.confirmPassword) {
        await axios.post('/api/v1/auth/register', formData);
      } else {
        setResponseError('Incorrect match, please check your password');
      }
    } catch (error) {
      setResponseError(error.response.data.error);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onShowToast = () => {
    toast.success(`🦄 Email has been sent to ${formData.email}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className="container-auth">
        <div className="img">
          <img src={require('../../img/signup.svg')} alt="signup" />
        </div>
        <div className="login-content">
          <form onSubmit={(e) => handleSubmit(e)}>
            <img src={require('../../img/avatar.svg')} alt="signin" />
            <h2 className="title">Lets Connect</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={formData.name}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

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
                />
              </div>
            </div>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  name="password"
                  value={formData.password}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Confirm Password</h5>
                <input
                  type="password"
                  className="input"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <Link to="/signin">Signin here</Link>
            {responseError ? (
              <span className="reserror">{responseError}</span>
            ) : null}
            <input
              type="submit"
              className="btn"
              value="Signup"
              onClick={onShowToast}
            />
            {responseError ? null : <ToastContainer />}
          </form>
        </div>
      </div>
    </>
  );
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(SignUp);
