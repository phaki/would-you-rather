import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import CurrentUser from './CurrentUser';

class Navigation extends Component {

  render() {
    const {isAuthorized} = this.props;

    return (
        <nav className='nav'>
          <ul>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                Leader board
              </NavLink>
            </li>
            {isAuthorized && (
                <li className='nav-right'>
                  <CurrentUser/>
                </li>
            )}
          </ul>
        </nav>
    )
  }
}

Navigation.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

function mapStateToProps({userId}) {
  return {
    isAuthorized: userId !== null && userId !== ''
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))