export const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function setAuthorizedUser(id) {
  return {
    type: SET_AUTHORIZED_USER,
    id
  }
}

export function handleAuthorizedUser(id) {
  return (dispatch) => {
    dispatch(setAuthorizedUser(id))
  }
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(setAuthorizedUser(''))
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

