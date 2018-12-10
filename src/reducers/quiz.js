const initialState = {
  question: 'What is a bitcoin',
  answers: ['a fruit', 'a bird', 'a weapon', 'a revolutionary cryptocurrency'],
  correctAnswer: 'a revolutionary cryptocurrency'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_QUESTION':
      return {
        ...action.payload
      }
    default:
      return state
  }
}
