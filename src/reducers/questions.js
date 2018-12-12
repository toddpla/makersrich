const questionsReducerDefaultState = []

export default (state = questionsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [action.question, ...state]
    case 'SET_QUESTIONS':
      return action.questions
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

//
// const initialState = {
// [  question: 'What is a bitcoin',
//   answers: ['a fruit', 'a bird', 'a weapon', 'a revolutionary cryptocurrency'],
//   correctAnswer: 'a revolutionary cryptocurrency',
//   results: []]
// }
