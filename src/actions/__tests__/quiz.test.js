import * as actions from '../quiz'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import questions from '../../fixtures/questions'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const questionsData = {};
  questions.forEach(({
    id,
    question,
    answers,
    correctAnswer
  }) => {
    questionsData[id] = {
      question,
      answers,
      correctAnswer
    }
  })
  database.ref('questions').set(questionsData).then(() => done())
})

test('should setup getQuestion action object', () => {
  const action = actions.getQuestion(questions[0])
  const expectedAction = {
    type: 'GET_QUESTION',
    question: questions[0]
  }
  expect(action).toEqual(expectedAction)
})

test('should getQuestion from the database', () => {
  actions.startGetQuestion()
})
