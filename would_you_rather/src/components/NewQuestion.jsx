import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {handleAddQuestion} from '../actions/question'
import PropTypes from 'prop-types';

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    errorMessage: '',
    toHomePage: false
  };

  handleChange = (e) => {
    const text = e.target.value;

    if (e.target.name === 'optionOneText') {
      this.setState(() => ({
        optionOneText: text
      }))
    } else {
      this.setState(() => ({
        optionTwoText: text
      }))
    }

    this.setState(() => ({
      errorMessage: ''
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {optionOneText, optionTwoText} = this.state;
    const {dispatch, userId} = this.props;

    if (optionOneText === '' || optionTwoText === '') {
      this.setState(() => ({
        errorMessage: 'Please fill the both options before submit!'
      }));
      return
    }
    if (optionOneText === optionTwoText) {
      this.setState(() => ({
        errorMessage: 'Option one and option two should not be the same!'
      }));
      return
    }

    dispatch(handleAddQuestion(optionOneText, optionTwoText, userId));

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHomePage: true
    }))
  };

  render() {
    const {optionOneText, optionTwoText, errorMessage, toHomePage} = this.state;
    const {isAuthorized} = this.props;

    if (!isAuthorized) {
      return <Redirect to='/login'/>
    }

    if (toHomePage) {
      return <Redirect to='/'/>
    }

    return (
        <div className="content-box">
          <div className='content-box-header'>
            <h3>Create New Question</h3>
          </div>
          <div className='content-box-body'>
            <p>Complete the question:</p>
            <h4>Would you rather ...</h4>
            <form onSubmit={this.handleSubmit}>
              <div className=''>
                <input type='text'
                       className='newQuestionOption'
                       name='optionOneText'
                       value={optionOneText}
                       placeholder='Enter Option One Text Here'
                       onChange={this.handleChange}/>
              </div>
              <h4 className='center'>OR</h4>
              <div>
                <input type='text'
                       className='newQuestionOption'
                       name='optionTwoText'
                       value={optionTwoText}
                       placeholder='Enter Option Two Text Here'
                       onChange={this.handleChange}/>
              </div>
              <br/>
              {errorMessage !== '' && (
                  <div className='validation-error'>{errorMessage}</div>
              )}
              <div className='center'>
                <button type='submit' className='question-answer-submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

NewQuestion.propTypes = {
  userId: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({userId}) {
  return {
    isAuthorized: userId !== null && userId !== '',
    userId: userId
  }
}

export default connect(mapStateToProps)(NewQuestion)