import React, { useEffect, useState } from 'react';
import {
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} from '../../actions/question';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DiscussionItem from '../DiscussionItem/DiscussionItem';
import './SingleQuePreview.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const SingleQuePreview = ({
  auth,
  question,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  match,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    image: '',
  });
  useEffect(() => {
    getSingleQuestion(match.params.questionId);
  }, []);

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
    await updateQuestion(obj);

    onCloseEditModal();
  };

  const dltQuestion = async (e) => {
    e.preventDefault();
    await deleteQuestion(match.params.questionId);
    onCloseDeleteModal();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setDeleteModalOpen(true);
  };
  const handleEditClick = (e) => {
    e.preventDefault();
    setEditModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const onCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      {question.singleQuestion === null ? (
        <>
          <img
            src={require('../../img/undraw_public_discussion_btnw.svg')}
            alt="discussion"
            className="discussion-img"
          />
          <h2 className="discussion-body">No discussions found</h2>
        </>
      ) : (
        <>
          <div className="discussion-container">
            <DiscussionItem
              el={question.singleQuestion}
              owner={
                auth.user._id === question.singleQuestion.user._id
                  ? true
                  : false
              }
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
            />
            <button className="btn-reply">
              <i className="fas fa-reply" style={{ marginRight: '6px' }}></i>{' '}
              Reply
            </button>

            {/* Delete Button Modal */}
            <Modal open={deleteModalOpen} onClose={onCloseDeleteModal} center>
              <div style={{ padding: '2.2rem 1.2rem', position: 'relative' }}>
                <h2
                  style={{
                    fontWeight: '500',
                    letterSpacing: '1.1px',
                    marginBottom: '12px',
                  }}>
                  Delete Discussion
                </h2>
                <h3
                  style={{
                    fontWeight: '400',
                    letterSpacing: '1.1px',
                    marginBottom: '10px',
                  }}>
                  Are you sure you want to delete?
                </h3>
                <button
                  className="btn-delete"
                  onClick={(e) => dltQuestion(e)}
                  style={{
                    position: 'absolute',
                    right: '0',
                    padding: '0.7rem 1rem',
                    backgroundColor: '#7A17CE',
                    outline: 'none',
                    border: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    letterSpacing: '1.1px',
                    cursor: 'pointer',
                  }}>
                  Delete
                </button>
              </div>
            </Modal>

            {/* Update Button Modal */}
            <Modal open={editModalOpen} onClose={onCloseEditModal} center>
              <h3 className="modal-title" style={{ padding: '0 1.2rem' }}>
                Edit
              </h3>
              <form
                style={{ padding: '2.2rem 1.2rem', position: 'relative' }}
                onSubmit={(e) => handleSubmit(e)}>
                <textarea
                  name="description"
                  rows="5"
                  cols="50"
                  placeholder="write something here..."
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
          </div>
        </>
      )}
    </>
  );
};

const mapStateToprops = (state) => {
  return {
    auth: state.auth,
    question: state.question,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleQuestion: (id) => dispatch(getSingleQuestion(id)),
    updateQuestion: (data) => dispatch(updateQuestion(data)),
    deleteQuestion: (id) => dispatch(deleteQuestion(id)),
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(SingleQuePreview));
