const playersReducerDefaultState = []

export default (state=playersReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return [...state, action.player]
    default:
      return state
  }
}
