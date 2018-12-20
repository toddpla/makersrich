import eggReducer from '../egg'


test('should set default state', () => {
  const state = eggReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({top:16,left:16})
})

test('should update egg', () => {
  const action = {
    type: "UPDATE_EGG",
    egg: { top: 32, left: 32 }
  }
  const state = eggReducer(undefined, action)
  expect(state).toEqual( { top: 32, left: 32 } )
})
