import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

class Statistics extends Component {

  static propTypes = {};

  render() {
    const {nameOfAuthor, authorAvatarURL, optionOne, optionTwo, optionOneVotes, optionTwoVotes, selectedOption} = this.props;

    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
        <div className="content-box">
          <div className='content-box-header'>
            <h3>Asked by {nameOfAuthor}</h3>
          </div>
          <div className='content-box-body'>
            <div className='content-box-question-left answered center'>
              <img
                  src={authorAvatarURL}
                  alt={`Avatar of ${nameOfAuthor}`}
                  className='question-author-avatar'
              />
            </div>
            <div className='content-box-question-right'>
              <h2>Results: </h2>
              <div className={`stats-option ${selectedOption === 'optionOne' ? 'choosen' : ''}`}>
                <h3 className='optionText'>
                  {optionOne}
                </h3>
                <p className='center'>
                  <strong>{((100 * optionOneVotes) / totalVotes).toFixed(1)} %</strong>
                </p>
                <progress value={optionOneVotes} max={totalVotes}></progress>
                <h3 className='center'>
                  {optionOneVotes} out of {totalVotes} votes
                </h3>
                {selectedOption === 'optionOne' &&
                <span className='yourChoiceIcon' title='Your choice'>&#9733;</span>
                }
              </div>
              <div className={`stats-option ${selectedOption === 'optionTwo' ? 'choosen' : ''}`}>
                <h3 className='optionText'>
                  {optionTwo}
                </h3>
                <p className='center'>
                  <strong>{((100 * optionTwoVotes) / totalVotes).toFixed(1)} %</strong>
                </p>
                <progress value={optionTwoVotes} max={totalVotes}></progress>
                <h3 className='center'>
                  {optionTwoVotes} out of {totalVotes} votes
                </h3>
                {selectedOption === 'optionTwo' &&
                <span className='yourChoiceIcon' title='Your choice'>&#9733;</span>
                }
              </div>
            </div>
            <div className='clearfix'></div>
          </div>
        </div>
    )
  }
}

Statistics.propTypes = {
  nameOfAuthor: PropTypes.string.isRequired,
  authorAvatarURL: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired,
  optionOneVotes: PropTypes.number.isRequired,
  optionTwoVotes: PropTypes.number.isRequired,
  selectedOption: PropTypes.oneOf(['optionOne', 'optionTwo']).isRequired
};

function mapStateToProps({userId, users, questions}, props) {
  const {id} = props;

  const question = questions[id];

  return {
    questionId: id,
    userId: userId,
    nameOfAuthor: users[question.author].name,
    authorAvatarURL: users[question.author].avatarURL,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
    optionOneVotes: question.optionOne.votes.length,
    optionTwoVotes: question.optionTwo.votes.length,
    selectedOption: question.optionOne.votes.includes(userId) === true ? 'optionOne' : 'optionTwo'
  }
}

export default connect(mapStateToProps)(Statistics)