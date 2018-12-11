import playersReducer from '../players'
import players from '../../fixtures/players'

test('should set default state', () => {
  const state = playersReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})

test('should add players to the game', () => {
  const action = {
    type: 'ADD_PLAYER',
    player: players[0]
  }
  const state = playersReducer(undefined, action)
  expect(state).toEqual(players)
})

test('should update player', () => {
  const action = {
    type: 'UPDATE_PLAYER',
    player: players[0],
    updates: {
      top: 16
    }
  }
  const player_one = players[0]
  player_one.top = 16
  const state = playersReducer(players, action)
  expect(state).toEqual([player_one])
})
