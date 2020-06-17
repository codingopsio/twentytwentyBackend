import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const Header = ({ isAuthenticated }) => {
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
              <a href="/#">Workshops</a>
            </li>
            <li>
              <a href="/#">Community</a>
            </li>

            {isAuthenticated ? (
              <Link to="/logout" className="btn-red">
                Logout
              </Link>
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

export default connect(mapStateToProps, null)(Header);
