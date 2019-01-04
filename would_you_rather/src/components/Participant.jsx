import React, {Fragment} from 'react'
import PropTypes from 'prop-types';

export default function Participant(props) {

  const {name, avatarURL, place, totalAnsweredQuestions, totalCreatedQuestions, totalPoints} = props

  return (
      <Fragment>
        {place <= 3 && (
            <div className='leaderBoardPlace'>
              <span>{place} place</span>
            </div>
        )}
        <div className='leaderBoardMember'>
          <div className='leaderBoardAvatar'>
            <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
            />
          </div>
          <div className='leaderBoardInfo'>
            <h2>{name}</h2>
            <div className='leaderBoardScoreSection'>
              <span>Answered questions</span>
              <span className='float-right'>{totalAnsweredQuestions}</span>
            </div>
            <div className='leaderBoardScoreSection'>
              <span>Created questions</span>
              <span className='float-right'>{totalCreatedQuestions}</span>
            </div>
          </div>
          <div className='leaderBoardScore'>
            <h3 className='center'>Score</h3>
            <p className='totalScore'>{totalPoints}</p>
          </div>
          <div className='clearfix'></div>
        </div>
      </Fragment>
  )
}

Participant.propTypes = {
  name: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  place: PropTypes.number.isRequired,
  totalAnsweredQuestions: PropTypes.number.isRequired,
  totalCreatedQuestions: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired
};