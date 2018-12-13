import mapReducer, {mapReducerDefaultState} from '../map'


const fakeInitialState = {
  collectables: [1,2,3,4],
  minable: [1,2,3,4]
}

const collectables = [1,2,3,4]
const minable = [1,2,3,4]

test('should set default state', () => {
  const state = mapReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({
     ...mapReducerDefaultState
  })
})

test('return state with adjusted collectables array', () => {
  const state = mapReducer(fakeInitialState, {type: 'COLLECT_ITEM', collectables: [2,3,4]})
  expect(state).toEqual({
    collectables: [2,3,4],
    minable
  })
})

test('return state array with adjusted minable array', () => {
  const state = mapReducer(fakeInitialState, {type: 'DIG_TILE', minable: [2,3,4]})
  expect(state).toEqual({
    collectables,
    minable: [2,3,4]
  })
})

test('return state array with adjusted minable array', () => {
  const state = mapReducer(fakeInitialState, {type: 'UN_DIG_TILE', minable: [2,3,4]})
  expect(state).toEqual({
    collectables,
    minable: [2,3,4]
  })
})
