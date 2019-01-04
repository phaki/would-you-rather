import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import Nav from './Navigation'
import Login from './Login';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import QuestionDetails from './QuestionDetails';
import error from './error';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
        <Router>
          <Fragment>
            <LoadingBar/>
            <div className='container'>
              {this.props.loading === false && (
                  <div>
                    <Nav/>
                    <Switch>
                      <Route path='/' exact component={Home}/>
                      <Route path='/login' component={Login}/>
                      <Route path='/add' component={NewQuestion}/>
                      <Route path='/leaderboard' component={LeaderBoard}/>
                      <Route path='/questions/:id' component={QuestionDetails}/>
                      <Route component={error}/>
                    </Switch>
                  </div>
              )}
            </div>
          </Fragment>
        </Router>
    )
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({userId}) {
  return {
    loading: userId === null
  }
}

export default connect(mapStateToProps)(App)