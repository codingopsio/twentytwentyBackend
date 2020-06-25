import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import './ResetPassword.css';
import { connect } from 'react-redux';

const ResetPassword = ({ resetPassword, match, isAuthenticated }) => {
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmpassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseError('');
    setLoading(true);

    if (passwordForm.password !== passwordForm.confirmpassword) {
      setLoading(false);
      return setResponseError('Password should match!');
    }

    const res = await resetPassword(match.params.id, passwordForm.password);
    if (res) {
      setLoading(false);
      return setResponseError(res);
    }

    setLoading(false);
    setPasswordForm({
      password: '',
      confirmpassword: '',
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="main-container">
          <div className="container-reset-password">
            {loading ? (
              <img
                className="reset-password-spinner"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                alt="spinner"
              />
            ) : (
              <>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <label
                    htmlFor="password"
                    className="heading-primary-password">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => onChange(e)}
                    value={passwordForm.password}
                  />
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    onChange={(e) => onChange(e)}
                    value={passwordForm.confirmpassword}
                  />

                  {responseError ? (
                    <span className="reserror">{responseError}</span>
                  ) : null}
                  <input type="submit" value="Submit" />
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (id, password) => dispatch(resetPassword(id, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
