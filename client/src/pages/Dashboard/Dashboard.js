import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllWebinars } from './../../actions/course';
import './Dashboard.css';
import CoursePreview from '../../components/CoursePreview/CoursePreview';

const Dashboard = ({ auth, getAllWebinars }) => {
  useEffect(() => {
    getAllWebinars();
  }, [getAllWebinars]);

  return (
    <>
      {auth.user === null ? (
        <img
          className="spinner"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="spinner"
        />
      ) : (
        <section className="welcome">
          <div className="container">
            <p className="welcome-text">Hi, {auth.user.name}</p>
            <p className="welcome-text">Welcome to our website!</p>
          </div>
        </section>
      )}

      <CoursePreview />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllWebinars: () => dispatch(getAllWebinars()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
