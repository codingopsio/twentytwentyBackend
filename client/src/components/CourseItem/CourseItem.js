import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseItem.css';
import '../../img/Deno.jpg';
import { connect } from 'react-redux';
import { uploadImage } from './../../actions/course';
import UpdateCourse from './../AdminComponents/UpdateCourse/UpdateCourse';

const CourseItem = ({
  photo,
  title,
  description,
  plan,
  difficulty,
  id,
  uploadImage,
}) => {
  const [data, setData] = useState({
    image: '',
    id: '',
  });

  const handleChange = (e) => {
    setData({ ...data, image: e.target.files[0], id: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage(data);
  };

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
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="file" name="myfile" onChange={(e) => handleChange(e)} />
          <input type="submit" value="upload image" />
        </form>
        <Link
          style={{ position: 'absolute', bottom: '19px', right: '20px' }}
          to={`updatecourse/${id}`}>
          Update Webinar
        </Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (data) => dispatch(uploadImage(data)),
  };
};

export default connect(null, mapDispatchToProps)(CourseItem);
