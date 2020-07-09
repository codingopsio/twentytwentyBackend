import React from 'react';
import DiscussionItem from './../DiscussionItem/DiscussionItem';
import './DiscussionPreview.css';

const DiscussionPreview = () => {
  return (
    <>
      <div className="discussion-container">
        <div className="heading">
          <h3>All Discussion</h3>
          <button className="btn-ask-question">
            <i className="fas fa-plus" style={{ marginRight: '6px' }}></i> Ask
            Question
          </button>
        </div>
        <DiscussionItem />
      </div>
    </>
  );
};

export default DiscussionPreview;
