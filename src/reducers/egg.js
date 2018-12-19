const defaultEggReducerState = {
  top: 16,
  left: 16
}

export default (state=defaultEggReducerState, action) => {
  switch (action.type) {
    case "UPDATE_EGG":
      return action.egg
    default:
      return state
  }
}
