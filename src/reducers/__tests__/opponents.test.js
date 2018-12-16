import opponentsReducer from '../opponents'
import playersData from '../../test/fixtures/players'


test('should set default state', () => {
  const state = opponentsReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})

test('should set opponents', () => {
  const action = {
    type: "SET_OPPONENTS",
    opponents: playersData.fixtures
  }
  const state = opponentsReducer(undefined, action)
  expect(state).toEqual(playersData.fixtures)
})
