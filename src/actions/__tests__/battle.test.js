import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import * as actions from '../battle'
import playersData from '../../test/fixtures/players'
import { firebaseLoad } from '../../test/firebase-helper'

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

test('should create a create battle action object', () => {
  const action = actions.enterBattle(opponent)
  expect(action).toEqual({
    type: "ENTER_BATTLE",
    opponent: players[1]
  })
})

test("should create a battle entry for the player and opponent", (done) => {
  store.dispatch(actions.startEnterBattle(opponent)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: "ENTER_BATTLE",
      opponent: players[1]
    })
    Promise.all([
      database.ref(`battles/${uid}/`).once('value').then(snap => snap.val()),
      database.ref(`battles/${opponent.uid}/`).once('value').then(snap => snap.val())
    ]).then(result => {
      expect(result[0].opponentUid).toEqual(players[1].uid)
      expect(result[0].opponentName).toEqual(players[1].displayName)
      expect(typeof result[0].created_at).toBe("number")

      expect(result[1].opponentUid).toEqual(players[0].uid)
      expect(result[1].opponentName).toEqual(players[0].displayName)
      expect(typeof result[1].created_at).toBe("number")
      done()
    })
  })
})

test("startCheckOpponentCanBattle returns true if player not in battle", (done) => {
  store.dispatch(actions.startCheckOpponentCanBattle(opponent)).then((snap) => {
    expect(snap).toBeTruthy()
    done()
  })
})

test("startCheckOpponentCanBattle returns false if player in battle", (done) => {
  database.ref(`battles/${opponent.uid}`).set({opponentUid: currentPlayer.uid}).then(() => {
    store.dispatch(actions.startCheckOpponentCanBattle(opponent)).then((snap) => {
      expect(snap).toBeFalsy()
      done()
    })
  })
})
