import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database, {firebase} from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk]);
