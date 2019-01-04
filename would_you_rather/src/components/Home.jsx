import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Question from './Question'
import PropTypes from 'prop-types';

class Home extends Component {

  state = {
    activeTab: 'unansweredQuestions'
  };

  handleTabChange = (tabName) => {
    this.setState(() => ({
      activeTab: tabName
    }))
  };

  render() {
    const {isAuthorized, unansweredQuestions, answeredQuestions} = this.props;

    if (!isAuthorized) {
      return <Redirect to='/login'/>
    }

    const {activeTab} = this.state;

    return (
        <div className='page-content'>
          <div className='tabs'>
            <div className={`tab ${activeTab === 'unansweredQuestions' ? 'active' : ''}`}
                 onClick={() => this.handleTabChange('unansweredQuestions')}>
              <h4>Unanswered Questions</h4>
            </div>
            <div className={`tab ${activeTab === 'answeredQuestions' ? 'active' : ''}`}
                 onClick={() => this.handleTabChange('answeredQuestions')}>
              <h4>Answered Questions</h4>
            </div>
          </div>
          <br/>
          <div className='questions'>
            {activeTab === 'unansweredQuestions'
                ?
                unansweredQuestions.map((questionId) => (
                    <Question key={questionId} id={questionId}/>
                ))
                :
                answeredQuestions.map((questionId) => (
                    <Question key={questionId} id={questionId}/>
                ))
            }
          </div>
        </div>
    )
  }
}

Home.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  unansweredQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  answeredQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps({userId, users, questions}) {

  const isAuthorized = userId !== null && userId !== '';
  let unansweredQuestions = [];
  let answeredQuestions = [];

  if (isAuthorized === true) {
    let user = users[userId];

    unansweredQuestions = Object.keys(questions)
        .filter((questionId) => (
            user.answers.hasOwnProperty(questionId) === false
        ))
        .map((questionId) => (
            questions[questionId]
        ))
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((question) => (
            question.id
        ));

    answeredQuestions = Object.keys(user.answers)
        .map((questionId) => (
            questions[questionId]
        ))
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((question) => (
            question.id
        ))
  }

  return {
    isAuthorized,
    unansweredQuestions,
    answeredQuestions
  }
}

export default connect(mapStateToProps)(Home)