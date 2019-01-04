import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Participant from './Participant';
import PropTypes from 'prop-types';

class LeaderBoard extends Component {

  render() {
    const {isAuthorized, participants} = this.props;

    if (isAuthorized === false) {
      return <Redirect to='/login'/>
    }

    return (
        <Fragment>
          {participants.map((member, index) => (
              <Participant
                  key={member.id}
                  place={index + 1}
                  name={member.name}
                  avatarURL={member.avatarURL}
                  totalAnsweredQuestions={member.totalAnsweredQuestions}
                  totalCreatedQuestions={member.totalCreatedQuestions}
                  totalPoints={member.totalPoints}
              />
          ))}
        </Fragment>
    )
  }
}

LeaderBoard.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({userId, users, questions}) {

  const participants = Object.keys(users).map((user) => ({
    ...users[user],
    totalCreatedQuestions: Object.keys(questions)
        .filter((question) => questions[question].author === user).length,
    totalAnsweredQuestions: Object.keys(questions)
        .filter((question) => questions[question].optionOne.votes.includes(user)
            || questions[question].optionTwo.votes.includes(user)).length
  })).map((leaderBoardMember) => ({
    ...leaderBoardMember,
    totalPoints: leaderBoardMember.totalCreatedQuestions + leaderBoardMember.totalAnsweredQuestions
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  return {
    isAuthorized: userId !== null && userId !== '',
    participants: participants
  }
}

export default connect(mapStateToProps)(LeaderBoard)