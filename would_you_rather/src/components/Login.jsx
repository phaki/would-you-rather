import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {handleAuthorizedUser} from '../actions/user'
import PropTypes from 'prop-types';

class Login extends Component {

  state = {
    selectedUserId: '',
    showMessage: false,
    gotoHome: false,
  };

  handleChange = (e) => {
    const selectedUserId = e.target.value;

    this.setState(() => ({
      selectedUserId,
    }))
  };

  handleClick = (e) => {
    e.preventDefault();

    const {selectedUserId} = this.state;
    const {dispatch} = this.props;

    if (selectedUserId !== '') {
      dispatch(handleAuthorizedUser(selectedUserId));

      this.setState(() => ({
        selectedUserId: '',
        showMessage: false,
        gotoHome: true
      }))
    }
    else {
      this.setState(() => ({
        showMessage: true
      }))
    }
  };

  render() {
    const {isAuthorized, availableUsers} = this.props;
    const {selectedUserId, showMessage, gotoHome} = this.state;

    if (isAuthorized || gotoHome) {
      return <Redirect to='/'/>
    }

    return (
        <div className="content-box center">
          <div className='content-box-header'>
            <h3>Welcome to the Wrould you Rather App!</h3>
            <p>Please sign in to continue</p>
          </div>
          <div className='content-box-body'>
            <br/>
            <select onChange={this.handleChange} value={selectedUserId}>
              <option value="" disabled>Choose user</option>
              {
                availableUsers.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            {showMessage && (
                <div className='validation-error'>Choose user from the dropdown and then sign in!</div>
            )}
            <br/>
            <button className='login-button' onClick={this.handleClick}>Sign in</button>
          </div>
        </div>
    )
  }
}

Login.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  availableUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({userId, users}) {
  return {
    isAuthorized: userId !== null && userId !== '',
    availableUsers: users !== null
        ? Object.keys(users).map((id) => (
            {
              id: id,
              name: users[id].name
            }))
        : []
  }
}

export default connect(mapStateToProps)(Login)