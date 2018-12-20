import * as actions from '../questions'

import configureStore from 'redux-mock-store'

const middlewares = []
const mockstore = configureStore(middlewares)

test('should setup setQuestions action object', () => {
  const action = actions.setQuestions('questions')
  const expectedAction = {
    type: 'SET_QUESTIONS',
    questions: 'questions'
  }
})

test('should setup addQuestion action object', () => {
  const action = actions.addQuestion('question')
  const expectedAction = {
    type: 'ADD_QUESTION',
    question: 'question'
  }
})
