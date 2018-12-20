import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database, {firebase} from '../../firebase/firebase'
import {
  login,
  startLogin,
  startGoogleLogin,
  startGithubLogin,
  logout,
  startLogout,
  updatePlayer,
  startUpdatePlayer,
  addInventoryItem,
  startAddInventoryItem
 } from '../auth'
import playersData from '../../test/fixtures/players'
import rubies from '../../test/fixtures/rubies'
import { firebaseLoad } from '../../test/firebase-helper'

const createMockStore = configureMockStore([thunk]);

let players, currentPlayer, uid, defaultAuthState, store;

beforeEach(done => {
  players = firebaseLoad(playersData, done)
  currentPlayer = players[0]
  uid = currentPlayer.uid
  defaultAuthState = { auth: { ...currentPlayer  } };
  store = createMockStore(defaultAuthState)
})

afterEach((done) => {
  database.ref('/players').remove().then(() => done())
})

test('should create the login action object with defaults', () => {
  const action = login(uid, currentPlayer)
  expect(action).toEqual({
    type: 'LOGIN',
    player: {
      inventory: {
        ruby: [],
        bean: [],
        key: [],
      },
      sessionQuestions: [],
      ...currentPlayer,
    }
  })
})

test('should get player data from database and initialise with defaults', (done) => {
  store.dispatch(startLogin(uid)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "LOGIN",
      player: {
        inventory: {
          ruby: [],
          bean: [],
          key: [],
        },
        state: 'online',
        sessionQuestions: [],
        ...currentPlayer
      }
    })
    done();
  })
})

test('should create logout action object', () => {
  expect(logout()).toEqual({
    type: "LOGOUT",
  })
})

test('should sign user out', (done) => {
  store.dispatch(startLogout()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: "LOGOUT"
    })
    done()
  })
})

test('should create update player action object', () => {
  const updates = {left: 150}
  const action = updatePlayer(updates)
  expect(action).toEqual({
    type: "UPDATE_PLAYER",
    updates
  })
})

test('should update the player in the database', (done) => {
  const updates = {left: 150}
  store.dispatch(startUpdatePlayer(updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: "UPDATE_PLAYER",
      updates
    })
    return database.ref(`players/${uid}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val().left).toBe(updates.left)
    done()
  })
})

test('should create add inventory item action object', () => {
  const itemRef = 'ruby';
  const item = {'ruby': 123}
  const action = addInventoryItem(itemRef, item)
  expect(action).toEqual({
    type: 'ADD_INVENTORY_ITEM',
    itemRef,
    item
  })
})

test('should add a ruby to the player inventory', (done) => {
  const itemRef = 'ruby';
  const item = rubies[0]
  store.dispatch(startAddInventoryItem(itemRef, item)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_INVENTORY_ITEM',
      itemRef,
      item
    })
    return database.ref(`players/${uid}/inventory/ruby/${item.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(item)
    done()
  })
})
