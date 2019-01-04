import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import error from './error';
import Statistics from "./Statistics";
import Answer from "./Answer";

class QuestionDetails extends Component {

  render() {
    const {isAuthorized, questionExists, questionId, questionIsAnswered} = this.props;

    if (!isAuthorized) {
      return <Redirect to='/login'/>
    }

    if (!questionExists) {
      return (
          <Redirect component={error}/>
      )
    }

    return (
        <Fragment>
          {questionIsAnswered ? <Statistics id={questionId}/> : <Answer id={questionId}/>}
        </Fragment>
    )
  }
}

QuestionDetails.propTypes = {
  questionId: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  questionExists: PropTypes.bool.isRequired,
  questionIsAnswered: PropTypes.bool.isRequired
};

function mapStateToProps({userId, users, questions}, props) {
  const {id} = props.match.params;

  const isAuthorized = userId !== null && userId !== '';

  let user = users[userId];

  return {
    isAuthorized: isAuthorized,
    questionExists: typeof (questions[id]) !== 'undefined' || questions[id] !== null,
    questionId: id,
    questionIsAnswered: isAuthorized && user.answers.hasOwnProperty(id) === true
  }
}

export default connect(mapStateToProps)(QuestionDetails)