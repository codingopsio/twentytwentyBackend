import React from 'react';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './AccountVerify.css';
import { Redirect } from 'react-router-dom';

const AccountVerify = ({ match, register, isAuthenticated }) => {
  const handleClick = async () => {
    register(match.params.id);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="button">
      <button onClick={handleClick}>Click here</button>
    </div>
  );
};

AccountVerify.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (id) => dispatch(register(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerify);
