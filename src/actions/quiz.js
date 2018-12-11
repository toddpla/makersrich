export const loadQuestion = () => ({
    type: 'LOAD_QUESTION',

    // THESE WILL COME FROM SOME ASSETS PLACE LADS
    payload: {
      question: 'What is a ethereum',
      answers: ['a fruit', 'a bird', 'a weapon', 'a revolution'],
      correctAnswer: 'a revolution'
    }
})

export const sendResult = (result) => ({
    type: 'SEND_RESULT',
    payload: {
      result: result
    }
})
