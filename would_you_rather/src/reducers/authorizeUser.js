export const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';

export default function userId(state = null, action) {
  if (action.type === SET_AUTHORIZED_USER) {
    return action.id
  }
  return state
}