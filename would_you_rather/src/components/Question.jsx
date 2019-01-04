import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

class Question extends Component {

  render() {
    const {id, nameOfAuthor, authorAvatarURL, notice} = this.props;

    return (
        <div className="content-box">
          <div className='content-box-header'>
            <h4>{nameOfAuthor} asks:</h4>
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
              <br/>
              <p>{notice}</p>
              <br/>
              <br/>
              <div className='center'>
                <Link to={`/questions/${id}`} className='question-details'>View Poll</Link>
              </div>
            </div>
            <div className='clearfix'></div>
          </div>
        </div>
    )
  }
}

Question.propTypes = {
  id: PropTypes.string.isRequired,
  nameOfAuthor: PropTypes.string.isRequired,
  authorAvatarURL: PropTypes.string.isRequired,
  notice: PropTypes.string.isRequired,
};

function mapStateToProps({userId, users, questions}, props) {
  const {id} = props;

  const question = questions[id];

  const options = `${question.optionOne.text} or ${question.optionTwo.text}`;
  const shortInfo = `${options.substring(0, Math.min(options.length, 40))}?`;

  return {
    id: id,
    nameOfAuthor: users[question.author].name,
    authorAvatarURL: users[question.author].avatarURL,
    notice: shortInfo
  }
}

export default connect(mapStateToProps)(Question)