import players from '../../fixtures/players'
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

const testUid = 'thisismytestuid'
const defaultAuthState = { auth: { testUid } };
const createMockStore = configureMockStore([thunk]);

let getState, store, uid;

beforeAll(() => {
  getState = jest.fn().mockReturnValue({
    auth: {
      uid: players[0].uid
    },
  })
})

beforeEach(done => {
  store = createMockStore(defaultAuthState)
  uid = players[0].uid
  const playersData = {};
  players.forEach(({uid, cash, top, left, inventory, level,displayName}) => {
    playersData[uid] = {cash, top, left, inventory, level, displayName}
  })
  database.ref(`players`).set(playersData).then(() => done());
})

test('should create the login action object', () => {
  const action = login(players[0].uid, players[0])
  expect(action).toEqual({
    type: 'LOGIN',
    player: {
      ...players[0]
    }
  })
})

test('should get player data from database', (done) => {
  store.dispatch(startLogin(uid)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "LOGIN",
      player: {...players[0]}
    })
    done();
  })
})

// test('should sign in player via Google Sign in', (done) => {
//   store.dispatch(startGoogleLogin()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: "LOGIN",
//       player: {...players[0]}
//     })
//     done()
//   })
// })
//
// test('should sign in player via Github Sign in', (done) => {
//   store.dispatch(startGithubLogin()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: "LOGIN",
//       player: {...players[0]}
//     })
//     done()
//   })
// })

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
  store.dispatch(startUpdatePlayer(uid, updates)).then(() => {
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

test('should add the item to the players inventory', (done) => {
  const itemRef = 'ruby';
  const item = {'testKey': 'testValue'}
  const getState = jest.fn().mockReturnValue({
    auth: {
      uid
    },
  })
  store.dispatch(startAddInventoryItem(itemRef, item)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_INVENTORY_ITEM',
      itemRef,
      item
    })
    return database.ref(`players/${uid}/inventory/ruby`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBe(1)
    done()
  })
})
