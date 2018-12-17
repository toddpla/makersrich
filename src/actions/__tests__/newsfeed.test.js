import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import databsae from '../../firebase/firebase'
import * as actions from '../newsfeed'

const createMockStore = configureMockStore([thunk])

let players
