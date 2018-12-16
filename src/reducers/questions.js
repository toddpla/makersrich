const questionsReducerDefaultState = []

export default (state = questionsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [action.question, ...state]
    case 'SET_QUESTIONS':
      return action.questions
    default:
      return state
  }
}
