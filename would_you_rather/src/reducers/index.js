import {combineReducers} from 'redux'
import {loadingBarReducer} from 'react-redux-loading'
import userId from './authorizeUser'
import users from './users'
import questions from './questions'

export default combineReducers({
  userId,
  users,
  questions,
  loadingBar: loadingBarReducer
})