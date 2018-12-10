import quizReducer from '../quiz'

describe ('quiz reducer', () => {

  it('should return the initial state', () => {
    expect((quizReducer(undefined, {}))).toEqual (
      {
        question: 'What is a bitcoin',
        answers: ['a fruit', 'a bird', 'a weapon', 'a revolutionary cryptocurrency'],
        correctAnswer: 'a revolutionary cryptocurrency',
        results: []
      }
    )
  })

  it('should return the new question state', () => {

    expect((quizReducer(undefined,
      {
        type: 'LOAD_QUESTION',
        payload: {
          question: 'What is a ethereum',
          answers: ['a fruit', 'a bird', 'a weapon', 'a revolution'],
          correctAnswer: 'a revolution'
        }
      }
      ))).toEqual (
      {
        results: [],
        question: 'What is a ethereum',
        answers: ['a fruit', 'a bird', 'a weapon', 'a revolution'],
        correctAnswer: 'a revolution'
      }
    )
  })

  it('should add result to results array', () => {

    expect((quizReducer(undefined,
      {
        type: 'SEND_RESULT',
        payload: {
          result: true
        }
      }
      ))).toEqual (
      {
        question: 'What is a bitcoin',
        answers: ['a fruit', 'a bird', 'a weapon', 'a revolutionary cryptocurrency'],
        correctAnswer: 'a revolutionary cryptocurrency',
        results: [true]
      }
    )
  })

})
