import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CourseItem.css";
import "../../img/Deno.jpg";
import { connect } from "react-redux";
import { uploadImage, deleteWebinar } from "./../../actions/course";

const CourseItem = ({
  photo,
  title,
  description,
  plan,
  difficulty,
  id,
  uploadImage,
  deleteWebinar,
}) => {
  const [data, setData] = useState({
    image: "",
    id: "",
  });

  const handleChange = (e) => {
    setData({ ...data, image: e.target.files[0], id: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage(data);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteWebinar(id);
  };

  return (
    <>
      <div className="card">
        <div className="easy-tag">{difficulty}</div>
        {photo === "no-photo.jpg" ? (
          <img src={require("../../img/Deno.jpg")} alt="card" />
        ) : (
          <img src={`/uploads/${photo}`} alt="card" />
        )}
        <small>{title}</small>
        <span>{description.split(" ").slice(0, 13).join(" ") + " ..."}</span>
        <p>{plan.toUpperCase()}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="file" name="myfile" onChange={(e) => handleChange(e)} />
          <input type="submit" value="upload image" />
        </form>
        <button
          style={{ position: "absolute", bottom: "19px", right: "150px" }}
          onClick={(e) => handleDelete(e)}
        >
          Delete Webinar
        </button>
        <Link
          style={{ position: "absolute", bottom: "19px", right: "20px" }}
          to={`updatecourse/${id}`}
        >
          Update Webinar
        </Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (data) => dispatch(uploadImage(data)),
    deleteWebinar: (id) => dispatch(deleteWebinar(id)),
  };
};

export default connect(null, mapDispatchToProps)(CourseItem);
