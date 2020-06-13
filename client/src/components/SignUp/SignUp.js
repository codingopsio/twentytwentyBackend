import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignUpAnimation } from "./../../utils/SignUp";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    SignUpAnimation();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password === formData.confirmPassword) {
        let response = await axios.post("/api/v1/auth/register", formData);
        console.log(response.data);
      } else {
        setResponseError("Incorrect match, please check your password");
        console.log(responseError);
      }
    } catch (error) {
      setResponseError(error.response.data.error);
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
          <img src={require("../../img/signup.svg")} alt="signup" />
        </div>
        <div className="login-content">
          <form onSubmit={(e) => onSubmit(e)}>
            <img src={require("../../img/avatar.svg")} alt="signin" />
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
            </div>
            <Link to="/signin">Signin here</Link>
            {responseError ? (
              <span className="reserror">{responseError}</span>
            ) : null}
            <input type="submit" className="btn" value="Signup" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
