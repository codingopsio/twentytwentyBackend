import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './CourseItem.css';
import '../../img/Deno.jpg';
import { connect } from 'react-redux';
import { deleteWebinar, getSingleWebinar } from './../../actions/course';

const CourseItem = ({
  photo,
  title,
  description,
  plan,
  difficulty,
  id,
  deleteWebinar,
  getSingleWebinar,
  user,
  history,
}) => {
  const handleDelete = (e) => {
    e.preventDefault();
    deleteWebinar(id);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (user.role !== 'admin') {
      getSingleWebinar(id);

      history.push(`/coursedetail/${id}`);
    }
  };

  return (
    <>
      <div className="card" onClick={(e) => handleClick(e)}>
        <div className="easy-tag">{difficulty}</div>
        {photo === 'no-photo.jpg' ? (
          <img src={require('../../img/Deno.jpg')} alt="card" />
        ) : (
          <img src={`/uploads/${photo}`} alt="card" />
        )}
        <small>{title}</small>
        <span>{description.split(' ').slice(0, 13).join(' ') + ' ...'}</span>
        <p>{plan.toUpperCase()}</p>
        {user.role === 'admin' ? (
          <>
            <button
              style={{ position: 'absolute', bottom: '19px', right: '150px' }}
              onClick={(e) => handleDelete(e)}>
              Delete Webinar
            </button>
            <Link
              style={{ position: 'absolute', bottom: '19px', right: '20px' }}
              to={`updatecourse/${id}`}>
              Update Webinar
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWebinar: (id) => dispatch(deleteWebinar(id)),
    getSingleWebinar: (id) => dispatch(getSingleWebinar(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseItem));
