import * as actions from '../map'

import configureStore from 'redux-mock-store'

const middlewares = []
const mockstore = configureStore(middlewares)

test('should setup collectItem action object', () => {
  const action = actions.collectItem('item')
  const expectedAction = {
    type: 'COLLECT_ITEM',
    collectable: 'item'
  }
})

test('should setup digTile action object', () => {
  const action = actions.digTile('tile')
  const expectedAction = {
    type: 'DIG_TILE',
    collectable: 'tile'
  }
})

test('should setup unDigTile action object', () => {
  const action = actions.unDigTile('tile')
  const expectedAction = {
    type: 'UN_DIG_TILE',
    collectable: 'tile'
  }
})
