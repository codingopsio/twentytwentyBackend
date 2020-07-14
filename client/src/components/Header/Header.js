import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

const Header = ({ isAuthenticated, logout, auth, location, match }) => {
  return (
    <React.Fragment>
      <div className="container">
        {location.pathname.startsWith('/discussions') ||
        location.pathname.startsWith('/question') ? (
          <nav className="course-nav">
            <Link to="/">
              <img
                src={require('../../img/logo-bookmark.svg')}
                alt="page-logo"
                className="logo"
              />
            </Link>
            <div className="vertical-line"></div>
            <div className="course-name">
              Stripe with react and Node crash course
            </div>
          </nav>
        ) : (
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
                  {auth.user === null || auth.loading ? (
                    <img
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      src={require('../../img/Rolling-1s-200px.gif')}
                      alt="spinner"
                    />
                  ) : (
                    <>
                      {auth.user.role === 'admin' ? (
                        <>
                          <li>
                            <Link to="/dashboard">Webinars</Link>
                          </li>
                          <li>
                            <Link to="/addcourse">Addcourse</Link>
                          </li>
                          <li>
                            <Link to="/useraccount">
                              <i className="fas fa-user-alt"></i>
                              {'  '} Account
                            </Link>
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
                            <Link to="/dashboard">Webinars</Link>
                          </li>
                          <li>
                            <Link to="/useraccount">
                              <i className="fas fa-user-alt"></i>
                              {'  '} Account
                            </Link>
                          </li>
                          <input
                            type="submit"
                            className="btn-red"
                            value="Logout"
                            onClick={() => logout()}
                          />
                        </>
                      )}
                    </>
                  )}
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
        )}
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
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
