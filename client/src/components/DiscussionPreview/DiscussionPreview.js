import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DiscussionItem from "./../DiscussionItem/DiscussionItem";
import "./DiscussionPreview.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { connect } from "react-redux";
import { createQuestion } from "../../actions/question";

const DiscussionPreview = ({ question, createQuestion, match, history }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = { ...formData, webinarId: match.params.id };
    await createQuestion(obj);

    onCloseModal();
  };

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setFormData({
      description: "",
      image: "",
    });
  };

  return (
    <>
      <div className="discussion-container">
        <div className="heading">
          <h3>All Discussion</h3>
          <button onClick={onOpenModal} className="btn-ask-question">
            <i className="fas fa-plus" style={{ marginRight: "6px" }}></i> Ask
            Question
          </button>
        </div>
        {question.loading ? (
          <img
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            src={require("../../img/Rolling-1s-200px.gif")}
            alt="spinner"
          />
        ) : (
          <>
            {question.questions.length === 0 ? (
              <img
                src={require("../../img/bot-new.gif")}
                alt="bot"
                className="questions-bot"
              />
            ) : (
              question.questions.map((el, i) => (
                <DiscussionItem
                  key={`item-${i}`}
                  el={el}
                  goToQsPage={() => {
                    history.push(`/question/${el._id}`);
                  }}
                />
              ))
            )}
          </>
        )}

        <Modal open={modalOpen} onClose={onCloseModal} center>
          <h3 className="modal-title" style={{ padding: "0 1.2rem" }}>
            All Discussion
          </h3>
          <form
            style={{ padding: "2.2rem 1.2rem", position: "relative" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              name="description"
              rows="5"
              cols="50"
              placeholder="write something here..."
              onChange={(e) => handleChange(e)}
              style={{
                cursor: "text",
                padding: "0.5rem",
                outline: "none",
                fontFamily: " 'Roboto', sans-serif",
                fontWeight: "500",
                letterSpacing: "1.1px",
                border: "1px solid #8a8686",
                marginTop: "-18px",
              }}
            />

            <div className="button-wrap">
              <label className="new-button" htmlFor="upload">
                {" "}
                Attach a file
              </label>
              <input
                className="modal-question-input"
                id="upload"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
            </div>

            <input
              type="submit"
              value="Ask Question"
              className="modal-question-submit"
              disabled={formData.description.length > 0 ? false : true}
            />
          </form>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    question: state.question,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuestion: (formData) => dispatch(createQuestion(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DiscussionPreview));
