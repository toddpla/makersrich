import authReducer from '../auth'

test('should set default state', () => {
  const state = authReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({})
})

test('should login user', () => {
  const action = {
    type: 'LOGIN',
    uid: '123'
  }
  const state = authReducer(undefined, action)
  expect(state).toEqual({uid: '123'})
})

test('should logout user', () => {
  const action = {
    type: 'LOGOUT',
  }
  const state = authReducer(undefined, action)
  expect(state).toEqual({})
})
