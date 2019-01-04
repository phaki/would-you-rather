import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleLogout} from '../actions/user'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

class CurrentUser extends Component {

  clickLogout = () => {
    this.props.dispatch(handleLogout());
    this.props.history.push(`/login`)
  };

  render() {
    const {name, avatarURL} = this.props;

    return (
        <Fragment>
          <span>Hello, {name}</span>
          <img
              src={avatarURL}
              alt={`Avatar of ${name}`}
              className='avatar'
          />
          <span className='cursor-pointer' onClick={this.clickLogout}>
          Logout
        </span>
        </Fragment>
    )
  }
}

CurrentUser.propTypes = {
  name: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({userId, users}) {
  return {
    name: users[userId] !== null ? users[userId].name : null,
    avatarURL: users[userId] !== null ? users[userId].avatarURL : null,
  }
}

export default withRouter(connect(mapStateToProps)(CurrentUser))