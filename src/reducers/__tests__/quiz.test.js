import quizReducer from '../quiz'

describe ('quiz reducer', () => {

  it('should return the initial state', () => {
    expect((quizReducer(undefined, {}))).toEqual (
      {
        question: 'What is a bitcoin',
        answers: ['a fruit', 'a bird', 'a weapon', 'a revolutionary cryptocurrency'],
        correctAnswer: 'a revolutionary cryptocurrency'
      }
    )
  })

})
