import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <>
      {auth.user === null && auth.loading ? (
        <img
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          src={require('../img/Rolling-1s-200px.gif')}
          alt="spinner"
        />
      ) : (
        <Route
          {...rest}
          render={(props) =>
            auth.user === null || auth.user.role !== 'admin' ? (
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
