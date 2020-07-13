import React from "react";
import "./DiscussionItem.css";
import moment from "moment";

const DiscussionItem = (props) => {
  console.log(props);
  return (
    <>
      <React.Fragment>
        <div
          className="discussion-card"
          onClick={props.goToQsPage ? props.goToQsPage : null}
        >
          <div className="header">
            <div className="user-logo">
              <span>{props.el.user.name[0]}</span>
            </div>
            <div className="main-head">
              <h2>{props.el.user.name}</h2>
              <p>Stripe with react and Node crash course</p>
              <span>{moment(props.el.date).format("MMM Do YY")}</span>
            </div>
          </div>
          <div className="description">
            <p>{props.el.description.slice(0, 40)}</p>
          </div>

          <i class="far fa-trash-alt"></i>
          <i class="far fa-edit"></i>
        </div>
      </React.Fragment>
    </>
  );
};

export default DiscussionItem;
