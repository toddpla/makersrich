import * as actions from '../egg'

import configureStore from 'redux-mock-store'

const middlewares = []
const mockstore = configureStore(middlewares)

test('should setup updateEgg action object', () => {
  const action = actions.updateEgg('egg')
  const expectedAction = {
    type: 'UPDATE_EGG',
    egg: 'egg'
  }
})
