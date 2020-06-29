import React, { useState } from 'react';
import { updateWebinar } from '../../../actions/course';
import { connect } from 'react-redux';
import './UpdateCourse.css';

const UpdateCourse = ({ updateWebinar }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    plan: '',
    CourseStructure: '',
    ManageTopics: '',
    difficulty: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    await updateWebinar(formData);

    setMsg('Webinar Updated');
    setLoading(false);

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
      {loading ? (
        <img
          className="spinner"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="spinner"
        />
      ) : (
        <section className="main">
          <div className="primary-heading">
            <h1>Update a Webinar</h1>
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

              {msg ? <span className="reserror">{msg}</span> : null}

              <button type="submit" className="btn-add">
                Update Webinar
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
    updateWebinar: (data) => dispatch(updateWebinar(data)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCourse);
