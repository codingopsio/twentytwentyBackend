import React, { useState, useEffect } from 'react';
import {
  updateWebinar,
  uploadImage,
  getSingleWebinar,
} from '../../../actions/course';
import { connect } from 'react-redux';
import './UpdateCourse.css';

const UpdateCourse = ({
  updateWebinar,
  uploadImage,
  getSingleWebinar,
  match,
  auth,
  singleWebinar,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    plan: '',
    CourseStructure: '',
    ManageTopics: '',
    difficulty: '',
    image: '',
    id: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getSingleWebinar(match.params.id);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFormData({ ...formData, image: e.target.files[0], id: match.params.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    let obj = { ...formData, id: match.params.id };
    await updateWebinar(obj);
    await uploadImage({ image: formData.image, id: formData.id });

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
      image: '',
      id: '',
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
                value={formData.title ? formData.title : singleWebinar.title}
              />
              <input
                name="description"
                type="text"
                className="form-feild"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                value={
                  formData.description
                    ? formData.description
                    : singleWebinar.description
                }
              />
              <input
                name="time"
                type="text"
                className="form-feild"
                placeholder="Total time of this course,  eg: 01:20"
                onChange={(e) => handleChange(e)}
                value={formData.time ? formData.time : singleWebinar.time}
              />
              <select
                name="plan"
                type="text"
                className="form-feild"
                onChange={(e) => handleChange(e)}
                value={formData.plan ? formData.plan : singleWebinar.plan}>
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
                value={
                  formData.CourseStructure
                    ? formData.CourseStructure
                    : singleWebinar.CourseStructure
                    ? singleWebinar.CourseStructure.join(',')
                    : ''
                }
              />
              <input
                type="text"
                className="form-feild"
                placeholder="Manage Topics,  eg: Css, Backend, Python etc.."
                name="ManageTopics"
                onChange={(e) => handleChange(e)}
                value={
                  formData.ManageTopics
                    ? formData.ManageTopics
                    : singleWebinar.ManageTopics
                    ? singleWebinar.ManageTopics.join(',')
                    : ''
                }
              />
              <select
                name="difficulty"
                type="text"
                className="form-feild"
                onChange={(e) => handleChange(e)}
                value={
                  formData.difficulty
                    ? formData.difficulty
                    : singleWebinar.difficulty
                }>
                <option>Select Plan</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={(e) => handleFileChange(e)}
              />

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
    uploadImage: (data) => dispatch(uploadImage(data)),
    getSingleWebinar: (id) => dispatch(getSingleWebinar(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    singleWebinar: state.course.singleWebinar,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCourse);
