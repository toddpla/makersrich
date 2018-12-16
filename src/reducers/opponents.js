const opponentsReducerDefaultState = []

export default (state=opponentsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_OPPONENTS":
      return action.opponents
    case "ADD_OPPONENT":
      return [
        ...state,
        action.opponent
      ]
    case "REMOVE_OPPONENT":
      return state.filter(({ uid }) => uid !== action.uid);
    default:
      return state
  }
}
