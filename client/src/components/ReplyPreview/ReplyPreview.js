import React, { useState } from 'react';
import ReplyItem from './../ReplyItem/ReplyItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ReplyPreview.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { createReply, deleteReply } from '../../actions/question';

const ReplyPreview = ({ createReply, deleteReply, auth, question, match }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    image: '',
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
    let obj = { ...formData, questionId: match.params.questionId };
    await createReply(obj);

    setFormData({
      description: '',
      image: '',
    });
    onCloseModal();
  };

  const onDeleteClick = async (replyId) => {
    await deleteReply(match.params.questionId, replyId);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setFormData({
      description: '',
      image: '',
    });
  };

  let reverseRepliesArray = question.singleQuestion.replies.map(
    (item, idx) =>
      question.singleQuestion.replies[
        question.singleQuestion.replies.length - 1 - idx
      ]
  );

  return (
    <>
      <div className="reply-preview-heading">
        <h3>
          All Replies <span>{question.singleQuestion.replies.length}</span>
        </h3>
        <div>
          <button
            className="btn-reply"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}>
            <i className="fas fa-reply"></i> Reply
          </button>
        </div>
      </div>
      {reverseRepliesArray.map((el) => (
        <ReplyItem
          key={el._id}
          el={el}
          owner={auth.user._id === el.user._id ? true : false}
          onDeleteClick={onDeleteClick}
        />
      ))}

      {/* <ReplyItem key={el._id} el={el} /> */}

      <Modal open={modalOpen} onClose={onCloseModal} center>
        <h3 className="modal-title" style={{ padding: '0 1.2rem' }}>
          Reply
        </h3>
        <form
          style={{ padding: '2.2rem 1.2rem', position: 'relative' }}
          onSubmit={(e) => handleSubmit(e)}>
          <textarea
            name="description"
            rows="5"
            cols="50"
            placeholder="write something here..."
            value={formData.description}
            onChange={(e) => handleChange(e)}
            style={{
              cursor: 'text',
              padding: '0.5rem',
              outline: 'none',
              fontFamily: " 'Roboto', sans-serif",
              fontWeight: '500',
              letterSpacing: '1.1px',
              border: '1px solid #8a8686',
              marginTop: '-18px',
            }}
          />

          <div className="button-wrap">
            <label className="new-button" htmlFor="upload">
              {' '}
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    question: state.question,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createReply: (data) => dispatch(createReply(data)),
    deleteReply: (questionId, replyId) =>
      dispatch(deleteReply(questionId, replyId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ReplyPreview));
