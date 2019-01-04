import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../actions/question'
import PropTypes from 'prop-types';

class Answer extends Component {

  state = {
    selectedOption: 'optionOne'
  };

  handleChange = (e) => {
    const option = e.target.value;

    this.setState(() => ({
      selectedOption: option
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {selectedOption} = this.state;
    const {dispatch, userId, questionId} = this.props;

    dispatch(handleAnswerQuestion(userId, questionId, selectedOption));

    this.setState(() => ({
      selectedOption: ''
    }))
  };

  render() {
    const {nameOfAuthor, authorAvatarURL, optionOne, optionTwo} = this.props;
    const {selectedOption} = this.state;

    return (
        <div className="content-box">
          <div className='content-box-header'>
            <h3>{nameOfAuthor} asks:</h3>
          </div>
          <div className='content-box-body'>
            <div className='content-box-question-left center'>
              <img
                  src={authorAvatarURL}
                  alt={`Avatar of ${nameOfAuthor}`}
                  className='question-author-avatar'
              />
            </div>
            <div className='content-box-question-right'>
              <h2>Would you rather</h2>
              <form onSubmit={this.handleSubmit}>
                <div className='answer-option'>
                  <input type='radio' name='option' value='optionOne'
                         defaultChecked={selectedOption === 'optionOne'}
                         onChange={this.handleChange}/>
                  <span>{optionOne}</span>
                </div>
                <div className='answer-option'>
                  <input type='radio' name='option' value='optionTwo'
                         defaultChecked={selectedOption === 'optionTwo'}
                         onChange={this.handleChange}/>
                  <span>{optionTwo}</span>
                </div>
                <br/>
                <div className='center'>
                  <button type='submit' className='question-answer-submit'>Submit</button>
                </div>
              </form>
            </div>
            <div className='clearfix'></div>
          </div>
        </div>
    )
  }
}

Answer.propTypes = {
  userId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  nameOfAuthor: PropTypes.string.isRequired,
  authorAvatarURL: PropTypes.string.isRequired,
  optionOne: PropTypes.string.isRequired,
  optionTwo: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
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
  }
}

export default connect(mapStateToProps)(Answer)