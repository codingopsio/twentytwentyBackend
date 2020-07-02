import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const AdminRoute = ({ component: Component, auth, ...rest }) => {
  console.log(auth.user);
  return (
    <>
      {auth.loading ? (
        <img
          className="spinner"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="spinner"
        />
      ) : (
        <Route
          {...rest}
          render={(props) =>
            auth.user.role !== 'admin' ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
            )
          }
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(AdminRoute);
