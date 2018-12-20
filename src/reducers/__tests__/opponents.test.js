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

test('should add opponent', () => {
  const action = {
    type: "ADD_OPPONENT",
    opponent: 'player 2'
  }
  const state = opponentsReducer(undefined, action)
  expect(state).toEqual(['player 2'])
})

test('should remove opponent', () => {
  const action = {
    type: "REMOVE_OPPONENT",
    uid: playersData.fixtures[3].uid
  }
  const state = opponentsReducer(playersData.fixtures, action)
  playersData.fixtures.pop()
  expect(state).toEqual(playersData.fixtures)
})
