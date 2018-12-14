import collectables from '../data/maps/level1/collectables'
import minable from '../data/maps/level1/minable'
import portals from '../data/maps/level1/portals'
import impassable from '../data/maps/level1/impassable'
import signs from '../data/maps/level1/signs'

export const mapReducerDefaultState = {
  collectables,
  minable,
  portals,
  impassable,
  signs
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
    case 'UN_DIG_TILE':
      return {
        ...state,
        minable: action.minable,
      }
    default:
      return state
  }
}
