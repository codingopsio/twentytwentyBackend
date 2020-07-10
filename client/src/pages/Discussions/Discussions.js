import React, { useEffect } from 'react';
import DiscussionPreview from './../../components/DiscussionPreview/DiscussionPreview';
import { getAllQuestions } from './../../actions/question';
import { connect } from 'react-redux';

const Discussions = ({ getAllQuestions, match }) => {
  useEffect(() => {
    getAllQuestions(match.params.id);
  }, []);
  return <DiscussionPreview />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: (webinarId) => dispatch(getAllQuestions(webinarId)),
  };
};

export default connect(null, mapDispatchToProps)(Discussions);
