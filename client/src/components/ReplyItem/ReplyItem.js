import React from 'react';

const ReplyItem = () => {
  return (
    <>
      <div className="discussion-card">
        <div className="header">
          <div className="user-logo">
            <span>logo</span>
          </div>
          <div className="main-head">
            <h2>name</h2>
            <p>Stripe with react and Node crash course</p>
            <span>Date</span>
          </div>
        </div>
        <div className="description">
          <p>description</p>
        </div>
      </div>
    </>
  );
};

export default ReplyItem;
