import {saveAnswer, saveQuestion} from '../utils/api'
import {hideLoading, showLoading} from 'react-redux-loading'

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function answerQuestion(userId, questionId, answer) {
  return {
    type: ANSWER_QUESTION,
    userId,
    questionId,
    answer
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author
    })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
  }
}

export function handleAnswerQuestion(userId, questionId, answer) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveAnswer({
      user: userId,
      qid: questionId,
      answer: answer
    })
        .then((question) => dispatch(answerQuestion(userId, questionId, answer)))
        .then(() => dispatch(hideLoading()))
  }
}