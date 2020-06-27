import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createWebinar } from '../../../actions/course';
import { connect } from 'react-redux';
import './AddCourse.css';

const AddCourse = ({ createWebinar }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    plan: '',
    CourseStructure: '',
    ManageTopics: '',
    difficulty: '',
  });

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'plan') {
      setFormData({ ...formData, plan: e.target.value });
    }

    if (e.target.name === 'difficulty') {
      setFormData({ ...formData, difficulty: e.target.value });
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    await createWebinar(formData);

    setMsg('Webinar Added');

    setFormData({
      title: '',
      description: '',
      time: '',
      plan: '',
      CourseStructure: '',
      ManageTopics: '',
      difficulty: '',
    });
  };

  return (
    <>
      {msg ? (
        <img
          className="spinner"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="spinner"
        />
      ) : (
        <section className="main">
          <div className="primary-heading">
            <h1>Add a Webinar</h1>
          </div>

          <div className="form">
            <form className="main-form" onSubmit={(e) => handleSubmit(e)}>
              <input
                name="title"
                type="text"
                className="form-feild"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
                value={formData.title}
              />
              <input
                name="description"
                type="text"
                className="form-feild"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                value={formData.description}
              />
              <input
                name="time"
                type="text"
                className="form-feild"
                placeholder="Total time of this course,  eg: 01:20"
                onChange={(e) => handleChange(e)}
                value={formData.time}
              />
              <select
                name="plan"
                type="text"
                className="form-feild"
                onChange={(e) => handleChange(e)}>
                <option>Select Plan</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
              <input
                type="text"
                className="form-feild"
                placeholder="Course Structure, eg: Css Basics, Node Basics etc.. "
                name="CourseStructure"
                onChange={(e) => handleChange(e)}
                value={formData.coursestructure}
              />
              <input
                type="text"
                className="form-feild"
                placeholder="Manage Topics,  eg: Css, Backend, Python etc.."
                name="ManageTopics"
                onChange={(e) => handleChange(e)}
                value={formData.managetopics}
              />
              <select
                name="difficulty"
                type="text"
                className="form-feild"
                onChange={(e) => handleChange(e)}>
                <option>Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <span className="reserror">{msg}</span>

              <button type="submit" className="btn-add">
                Add Webinar
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createWebinar: (data) => dispatch(createWebinar(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddCourse);
