const defaultEggReducerState = {
  top: 0,
  left: 0
}

export default (state=defaultEggReducerState, action) => {
  switch (action.type) {
    case "UPDATE_EGG":
      return action.egg
    default:
      return state
  }
}
