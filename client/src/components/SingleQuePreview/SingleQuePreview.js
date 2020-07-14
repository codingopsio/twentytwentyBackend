import React, { useEffect } from "react";
import { getSingleQuestion } from "../../actions/question";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DiscussionItem from "../DiscussionItem/DiscussionItem";

const SingleQuePreview = ({ question, getSingleQuestion, match }) => {
  useEffect(() => {
    getSingleQuestion(match.params.questionId);
  }, []);

  return (
    <>
      {question.singleQuestion === null ? (
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
        <DiscussionItem el={question.singleQuestion} />
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
