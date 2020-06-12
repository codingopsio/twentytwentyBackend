import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignUpAnimation } from './../../utils/SignUp';

const SignIn = () => {
  useEffect(() => {
    SignUpAnimation();
  }, []);

  return (
    <>
      <div className="container-auth">
        <div className="img">
          <img src={require('../../img/save.svg')} alt="save" />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src={require('../../img/avatar.svg')} alt="avatar" />
            <h2 className="title">Welcome Back</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input type="text" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input type="password" className="input" />
              </div>
            </div>
            <Link to="/signup">Signup here </Link>
            <a> Forgot Password?</a>
            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
