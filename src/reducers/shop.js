import inventory from '../data/maps/level1/shopinventory'

const shopReducerDefaultState = {
  inventory: inventory
}

export default (state = shopReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
