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

test('should create set opponents action object', () => {
  const action = actions.setOpponents(players)
  // players.shift()
  expect(action).toEqual({
    type: "SET_OPPONENTS",
    opponents: players
  })
})

test('should get opponents from database', (done) => {
  store.dispatch(actions.startSetOpponents()).then(() => {
    const actions = store.getActions()
    players.shift()
    players.pop()
    expect(actions[0]).toEqual({
      type: "SET_OPPONENTS",
      opponents: players
    })
    done()
  })
})
