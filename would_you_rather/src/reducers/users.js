export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case ANSWER_QUESTION:
      const {userId, questionId, answer} = action;

      return {
        ...state,
        [userId]: {
          ...state[userId],
          answers: {
            ...state[userId].answers,
            [questionId]: answer
          }
        }
      };

    default:
      return state
  }
}