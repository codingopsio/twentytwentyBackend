import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <React.Fragment>
      <div className="container">
        <nav class="main-nav">
          <Link to="/">
            <img
              src={require('../../img/logo-bookmark.svg')}
              alt="page-logo"
              class="logo"
            />
          </Link>
          <ul class="nav-links">
            <li>
              <a href="#">Workshops</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <Link to="/signin">Login</Link>
            </li>
            <Link to="/signup" class="btn-red">
              Register
            </Link>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
