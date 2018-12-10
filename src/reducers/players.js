const playersReducerDefaultState = []

export default (state=playersReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return [...state, action.player]
    case "UPDATE_PLAYER":
      return state.map(player => {
        if (player.name === action.player.name) {
          return {
            ...player,
            ...action.updates
          }
      } else {
        return player
      }
    })
    default:
      return state
  }
}
