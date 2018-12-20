import * as actions from '../messages'

import configureStore from 'redux-mock-store'

const middlewares = []
const mockstore = configureStore(middlewares)

test('should setup addMessage action object', () => {
  const action = actions.addMessage('message')
  const expectedAction = {
    type: 'ADD_MESSAGE',
    message: 'message'
  }
})
