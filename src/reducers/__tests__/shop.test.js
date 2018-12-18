import inventory from '../../data/maps/level1/shopinventory'
import shopReducer from '../shop'

test('should set default state', () => {
  const state = shopReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({
    inventory: inventory 
  })
})
