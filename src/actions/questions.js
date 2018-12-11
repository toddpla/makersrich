import database from '../firebase/firebase'

export const startSetQuestions = () => {
  return(dispatch) => {
    return database.ref('questions').once('value').then((snapshot) => {
      const questions = []
      snapshot.forEach(childSnapshot => {
        questions.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setQuestions(questions))
    })
  }
}

export const setQuestions = (questions) => ({
  type: 'SET_QUESTIONS',
  questions
})

export const startAddQuestion = (question) => {
  return(dispatch) => {
    return database.ref('questions').push(question).then((ref) => {
      dispatch(addQuestion({
        id: ref.key,
        ...question
      }))
    })
  }
}

export const addQuestion = (question) => ({
  type: 'ADD_QUESTION',
  question
})

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
