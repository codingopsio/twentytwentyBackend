import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignUpAnimation } from './../../utils/SignUp';
import './SignUp.css';

const SignUp = () => {
  useEffect(() => {
    SignUpAnimation();
  }, []);

  return (
    <>
      <div class="container-auth">
        <div class="img">
          <img src={require('../../img/signup.svg')} alt="signup" />
        </div>
        <div class="login-content">
          <form action="index.html">
            <img src={require('../../img/avatar.svg')} alt="signin" />
            <h2 class="title">Lets Connect</h2>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input type="text" class="input" />
              </div>
            </div>

            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input type="text" class="input" />
              </div>
            </div>

            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input type="password" class="input" />
              </div>
            </div>

            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Confirm Password</h5>
                <input type="password" class="input" />
              </div>
            </div>
            <Link to="/signin">Signin here</Link>
            <input type="submit" class="btn" value="Signup" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
