import * as actions from '../quiz'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import playersData from '../../test/fixtures/players'
import questionsData from '../../test/fixtures/questions'
import database from '../../firebase/firebase'
import { firebaseLoad } from '../../test/firebase-helper'

const createMockStore = configureMockStore([thunk]);

let players, questions, currentPlayer, uid, defaultAuthState, store;

beforeEach((done) => {
  players = firebaseLoad(playersData, done)
  questions = firebaseLoad(questionsData, done)
  currentPlayer = players[0]
  uid = currentPlayer.uid
  defaultAuthState = { auth: { ...currentPlayer } };
  store = createMockStore(defaultAuthState)
})

afterAll((done) => {
  database.ref('/players').remove().then(() => done())
  database.ref('/questions').remove().then(() => done())
})

test('should setup getQuestion action object', () => {
  const action = actions.getQuestion(questions[0])
  const expectedAction = {
    type: 'GET_QUESTION',
    question: questions[0]
  }
  expect(action).toEqual(expectedAction)
})

//this function needs to be moved to a firebase function
// test('should getQuestion from the database', (done) => {
//   store.dispatch(actions.startGetQuestion()).then(() => {
//     const actions = store.getActions()
//     expect(actions[0]).toEqual({
//       type: 'GET_QUESTION',
//       question: questions[0]
//     })
//     done()
//   })
// })
