export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TILES':
      return {
        tiles: tiles
      }
    default:
      return state
  }
}
