import messagesReducer from '../messages'


test('should set default state', () => {
  const state = messagesReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})

test('should add message to array', () => {
  const action = {
    type: "ADD_MESSAGE",
    message: 'this is a message'
  }
  const state = messagesReducer(undefined, action)
  expect(state).toEqual( ['this is a message'] )
})
