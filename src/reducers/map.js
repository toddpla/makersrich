import collectables from '../data/maps/level1/collectables'

const mapReducerDefaultState = {
  collectables
}

export default (state=mapReducerDefaultState, action) => {
  switch (action.type) {
    case 'COLLECT_ITEM':
      return {
        collectables: action.collectables
      }
    default:
      return state
  }
}
