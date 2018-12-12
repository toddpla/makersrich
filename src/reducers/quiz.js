const quizReducerDefaultState = {}

export default (state = quizReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_QUESTION':
      return action.question
    default:
      return state
  }
}
