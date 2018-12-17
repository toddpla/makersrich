import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import * as actions from '../newsfeed'

const createMockStore = configureMockStore([thunk])

let currentPlayer, uid, defaultAuthState, store;

beforeEach(done => {
  uid = 'sometestuid'
  defaultAuthState = { auth: { uid } };
  store = createMockStore(defaultAuthState)
})

test('should add message to the newsfeed', (done) => {
  const message = "test message"
  actions.startSendNewsfeedMessage(message)
  database.ref('newsfeed').once('value').then(snap => {
    const messages = []
    snap.forEach(childSnap => {
      messages.push(childSnap.val())
    })
    expect(messages[0].message).toEqual(message)
  })
})
