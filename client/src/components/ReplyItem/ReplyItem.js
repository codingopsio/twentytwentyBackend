import React from 'react';
import moment from 'moment';

const ReplyItem = (props) => {
  return (
    <>
      <div className="discussion-card">
        <div className="header">
          <div className="user-logo">
            <span>{props.el.user.name[0]}</span>
          </div>
          <div className="main-head">
            <h2>{props.el.user.name}</h2>
            <p>Stripe with react and Node crash course</p>
            <span>{moment(props.el.date).format('MMM Do YY')}</span>
          </div>

          {props.owner ? (
            <span>
              <i className="far fa-trash-alt"></i>
            </span>
          ) : null}
        </div>
        <div className="description">
          <p>{props.el.description}</p>
        </div>
      </div>
    </>
  );
};

export default ReplyItem;
