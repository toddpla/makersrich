import store from '../store/configureStore'

export const loadQuestion = () => ({
    type: 'LOAD_QUESTION',
    payload: {
      question: 'What is a ethereum',
      answers: ['a fruit', 'a bird', 'a weapon', 'a revolution'],
      correctAnswer: 'a revolution'
    }
})
