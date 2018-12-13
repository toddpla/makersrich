import authReducer from '../auth'

test('should set default state', () => {
  const state = authReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({})
})

test('should login user', () => {
  const player = {
        uid: 123,
        top: 0,
        left: 0,
        ruby: [],
        javaBeans: [],
        key: [],
      }
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
