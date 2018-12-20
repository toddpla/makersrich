import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import * as actions from '../../actions/battle'
import playersData from '../fixtures/players'
import { firebaseLoad } from '../firebase-helper'

const createMockStore = configureMockStore([thunk])

let players, currentPlayer, uid, defaultAuthState, store, opponent;

beforeEach(done => {
  players = firebaseLoad(playersData, done)
  currentPlayer = players[0]
  uid = currentPlayer.uid
  defaultAuthState = { auth: { ...currentPlayer } };
  store = createMockStore(defaultAuthState)
  opponent = players[1]
})

afterEach((done) => {
  database.ref('/players').remove().then(() => done())
  database.ref('/battles').remove().then(() => done())
})

test("should not allow battle after battle made", (done) => {
  database.ref(`battles/${opponent.uid}`).set({opponentUid: currentPlayer.uid})
  store.dispatch(actions.startCheckOpponentCanBattle(opponent)).then((snap) => {
    expect(snap).toBeFalsy()
    done()
  })
})
