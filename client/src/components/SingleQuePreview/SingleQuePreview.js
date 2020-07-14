import React, { useEffect, useState } from 'react';
import { getSingleQuestion } from '../../actions/question';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DiscussionItem from '../DiscussionItem/DiscussionItem';
import './SingleQuePreview.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const SingleQuePreview = ({ question, getSingleQuestion, match }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    getSingleQuestion(match.params.questionId);
  }, []);

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
    setDeleteModalOpen(false);
  };

  return (
    <>
      {question.singleQuestion === null ? (
        <img
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          src={require('../../img/Rolling-1s-200px.gif')}
          alt="spinner"
        />
      ) : (
        <>
          <div className="discussion-container">
            <DiscussionItem
              el={question.singleQuestion}
              handleDeleteClick={handleDeleteClick}
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
                    marginBottom: '18px',
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
                All Discussion
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
    question: state.question,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleQuestion: (id) => dispatch(getSingleQuestion(id)),
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(SingleQuePreview));
