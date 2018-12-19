const defaultMessagesReducerState = []

export default (state = defaultMessagesReducerState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.message
      ]
    default:
      return state
  }
}
