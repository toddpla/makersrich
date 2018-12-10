const playersReducerDefaultState = []

export default (state=playersReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return [...state, action.player]
    case "UPDATE_PLAYER":
      return state.map(player => {
        if (player.uid === action.id) {
          return {
            ...player,
            ...action.updates
          }
        } else {
          return player
        }
      })
    case "SET_PLAYERS":
      return action.players
    default:
      return state
  }
}
