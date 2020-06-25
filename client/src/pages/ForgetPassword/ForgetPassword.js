import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgetPassword.css';
import { connect } from 'react-redux';
import { forgotPassword } from './../../actions/auth';

const ForgetPassword = ({ forgotPassword, error }) => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponseError('');
    setLoading(true);

    forgotPasswordError(userEmail);
  };

  const forgotPasswordError = async (email) => {
    const res = await forgotPassword(email);

    if (res) {
      setLoading(false);
      return setResponseError(res);
    }
    setLoading(false);
    toast.success(`📧 An email has been sent to ${userEmail} `, {
      position: 'top-center',
    });

    setUserEmail('');
  };

  return (
    <div className="main-container">
      <div className="container-forget-password">
        {loading ? (
          <img
            className="forgot-password-spinner"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="spinner"
          />
        ) : (
          <>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="email" className="heading-primary-email">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) => onChange(e)}
                value={userEmail}
              />

              {responseError ? (
                <span className="reserror">{responseError}</span>
              ) : null}
              <input type="submit" value="Submit" />
            </form>
            <ToastContainer />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
