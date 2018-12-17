const newsfeedReducerDefaultState =
  [
    "This is the newsfeed",
    "Let the games...",
    "begin."
  ]


export default (state=newsfeedReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
