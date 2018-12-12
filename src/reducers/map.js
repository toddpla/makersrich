import collectables from '../data/maps/level1/collectables'
import minable from '../data/maps/level1/minable'

const mapReducerDefaultState = {
  collectables,
  minable
}

export default (state=mapReducerDefaultState, action) => {
  switch (action.type) {
    case 'COLLECT_ITEM':
      return {
        ...state,
        collectables: action.collectables
      }
    case 'DIG_TILE':
      return {
        ...state,
        minable: action.minable,
      }
    default:
      return state
  }
}
