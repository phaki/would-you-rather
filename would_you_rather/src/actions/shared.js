import {getInitialData} from '../utils/api'
import {receiveUsers, setAuthorizedUser} from '../actions/user'
import {receiveQuestions} from '../actions/question'
import {hideLoading, showLoading} from 'react-redux-loading'

const USER_ID = '';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
        .then(({users, questions}) => {
          dispatch(receiveUsers(users));
          dispatch(receiveQuestions(questions));
          dispatch(setAuthorizedUser(USER_ID));
          dispatch(hideLoading())
        })
  }
}