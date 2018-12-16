import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database, {firebase} from '../../firebase/firebase'
import * as actions from '../opponents'
import playersData from '../../test/fixtures/players'
import { firebaseLoad } from '../../test/firebase-helper'

const createMockStore = configureMockStore([thunk]);

let players, currentPlayer, uid, defaultAuthState, store;

beforeEach(done => {
  players = firebaseLoad(playersData, done)
  currentPlayer = players[0]
  uid = currentPlayer.uid
  defaultAuthState = { auth: { ...currentPlayer } };
  store = createMockStore(defaultAuthState)
})

afterAll((done) => {
  database.ref('/players').remove().then(() => done())
})

test('should create add opponent action object', () => {
  const action = actions.addOpponent(players[0])
  expect(action).toEqual({
    type: "ADD_OPPONENT",
    opponent: players[0]
  })
})

test('should create add opponent action object', () => {
  const action = actions.removeOpponent(players[0].uid)
  expect(action).toEqual({
    type: "REMOVE_OPPONENT",
    uid: players[0].uid
  })
})
