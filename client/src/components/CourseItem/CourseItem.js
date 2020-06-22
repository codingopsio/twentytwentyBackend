import React from 'react';
import './CourseItem.css';
import '../../img/Deno.jpg';

const CourseItem = ({ photo, title, description, plan, difficulty }) => {
  return (
    <>
      <div className="card">
        <div className="easy-tag">{difficulty}</div>
        {photo === 'no-photo.jpg' ? (
          <img src={require('../../img/Deno.jpg')} alt="card" />
        ) : (
          <img src={`/uploads/${photo}`} alt="card" />
        )}
        <small>{title}</small>
        <span>{description.split(' ').slice(0, 13).join(' ') + ' ...'}</span>
        <p>{plan.toUpperCase()}</p>
      </div>
    </>
  );
};

export default CourseItem;
