import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignUpAnimation } from './../../utils/SignUp';

const SignIn = () => {
  useEffect(() => {
    SignUpAnimation();
  }, []);

  return (
    <>
      <div class="container-auth">
        <div class="img">
          <img src={require('../../img/save.svg')} />
        </div>
        <div class="login-content">
          <form action="index.html">
            <img src={require('../../img/avatar.svg')} />
            <h2 class="title">Welcome Back</h2>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input type="text" class="input" />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input type="password" class="input" />
              </div>
            </div>
            <Link to="/signup">Signup here </Link>
            <a> Forgot Password?</a>
            <input type="submit" class="btn" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
