import authReducer from '../auth'
import player from '../../test/fixtures/playerWithInventory'

test('should set default state', () => {
  const state = authReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({})
})

test('should login user', () => {
  const action = {
    type: 'LOGIN',
    player
  }
  const state = authReducer(undefined, action)
  expect(state).toEqual(player)
})

test('should logout user', () => {
  const action = {
    type: 'LOGOUT',
  }
  const state = authReducer(undefined, action)
  expect(state).toEqual({})
})

test('should update user', () => {
  const updates = {left: 16}
  const action = {
    type: "UPDATE_PLAYER",
    updates
  }
  const state = authReducer(player, action)
  expect(state.left).toEqual(updates.left)
})

test('should add an inventory item', () => {
  const itemRef = 'ruby'
  const item = {'value': 100}
  const action = {
    type: "ADD_INVENTORY_ITEM",
    itemRef,
    item
  }
  const state = authReducer(player, action)
  player.inventory[itemRef].push(item)
  expect(state).toEqual(player)
})
