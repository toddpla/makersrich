const initialState = {
  question: 'What is a bitcoin',
  answers: ['a fruit', 'a bird', 'a weapon', 'a revolutionary cryptocurrency'],
  correctAnswer: 'a revolutionary cryptocurrency',
  results: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_QUESTION':
      return {
        results: state.results,
        question: action.payload.question,
        answers: action.payload.answers,
        correctAnswer: action.payload.correctAnswer
      }
    case 'SEND_RESULT':
      state.results.push(action.payload.result)
      return {
        ...state
      }
    default:
      return state
  }
}
