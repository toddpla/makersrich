export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TILES':
    console.log(action.tiles)
      return {
        tiles: action.tiles
      }
    default:
      return state
  }
}
