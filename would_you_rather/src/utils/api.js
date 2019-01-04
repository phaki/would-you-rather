import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer,} from './_DATA.js'

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion(question) {
  return _saveQuestion(question)
}

export function saveAnswer(userId, qid, answer) {
  return _saveQuestionAnswer(userId, qid, answer)
}