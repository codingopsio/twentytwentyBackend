import React from 'react';
import './DiscussionItem.css';

const DiscussionItem = () => {
  return (
    <>
      <div className="discussion-card">
        <div className="header">
          <div className="user-logo">
            <span>A</span>
          </div>
          <div className="main-head">
            <h2>Ayan Banerjee</h2>
            <p>Stripe with react and Node crash course</p>{' '}
            <span>13th May 2020</span>
          </div>
        </div>
        <div className="description">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet,
            temporibus.
          </p>
        </div>
      </div>
      <div className="discussion-card">
        <div className="header">
          <div className="user-logo">
            <span>R</span>
          </div>
          <div className="main-head">
            <h2>Rohan Banerjee</h2>
            <p>Stripe with react and Node crash course</p>
            <span>13th May 2020</span>
          </div>
        </div>
        <div className="description">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet,
            temporibus. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Amet, temporibus. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Amet, temporibus.
          </p>
        </div>
      </div>
    </>
  );
};

export default DiscussionItem;
