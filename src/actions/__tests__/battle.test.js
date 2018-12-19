import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database, {firebase} from '../../firebase/firebase'
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

afterAll((done) => {
  database.ref('/players').remove().then(() => done())
})

test('should create a create battle action object', () => {
  const action = actions.createBattle(opponent)
  expect(action).toEqual({
    type: "CREATE_BATTLE",
    opponent: players[1]
  })
})

test("should create a battle entry for the player and opponent", (done) => {
  store.dispatch(actions.startCreateBattle(opponent)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: "CREATE_BATTLE",
      opponent: players[1]
    })
    const result = {
      playerBattle: database.ref(`battles/${uid}/`).once('value'),
      opponentBattle: database.ref(`battles/${opponent.uid}/`).once('value')
    }
    return result
  }).then(result => {
    expect(result.playerBattle.val()).toEqual({
      opponentUid: players[1].uid,
      opponentName: players[1].displayName
    })
    expect(result.opponentBattle.val()).toEqual({
      opponentUid: uid,
      opponentName: currentPlayer.displayName
    })
    done()
  })
})
