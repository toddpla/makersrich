const quizReducerDefaultState = {}

export default (state = quizReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_QUESTION':
      return action.question
    case 'CLEAR_QUIZ':
      return action.quiz
    default:
      return state
  }
}
