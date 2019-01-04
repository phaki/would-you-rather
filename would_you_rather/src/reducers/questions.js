export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      const {question} = action;

      return {
        ...state,
        [question.id]: question,
      };
    case ANSWER_QUESTION:
      const {userId, questionId, answer} = action;

      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          optionOne: {
            ...state[questionId].optionOne,
            votes: answer === 'optionOne'
                ? state[questionId].optionOne.votes.concat([userId])
                : state[questionId].optionOne.votes
          },
          optionTwo: {
            ...state[questionId].optionTwo,
            votes: answer === 'optionTwo'
                ? state[questionId].optionTwo.votes.concat([userId])
                : state[questionId].optionTwo.votes
          }
        }
      };
    default:
      return state
  }
}