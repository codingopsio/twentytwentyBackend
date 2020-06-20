import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

const Header = ({ isAuthenticated, logout }) => {
  return (
    <React.Fragment>
      <div className="container">
        <nav className="main-nav">
          <Link to="/">
            <img
              src={require('../../img/logo-bookmark.svg')}
              alt="page-logo"
              className="logo"
            />
          </Link>
          <ul className="nav-links">
            <li>
              <a href="/#">Join Community</a>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard">Webinars</Link>
                </li>
                <input
                  type="submit"
                  className="btn-red"
                  value="Logout"
                  onClick={() => logout()}
                />
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <Link to="/signup" className="btn-red">
                  Register
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
