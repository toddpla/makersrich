const newsfeedReducerDefaultState =
  [
    "This is the newsfeed",
    "Let the games...",
    "begin."
  ]

export default (state=newsfeedReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [action.message, state[1], state[2]]
    default:
      return state
  }
}
