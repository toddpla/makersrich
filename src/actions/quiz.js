import database from '../firebase/firebase'

export const getQuestion = (question) => ({
  type: 'GET_QUESTION',
  question
})

export const startGetQuestion = () => {
  return (dispatch) => {
    return database.ref('questions').once('value').then((snapshot) => {
      const questions = []
      snapshot.forEach(childSnapshot => {
        questions.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      const index = Math.floor(Math.random() * questions.length)
      dispatch(getQuestion(questions[index]))
    })
  }
}

export const sendResult = (result) => ({
    type: 'SEND_RESULT',
    result
})

export const startSendResult = ({uid, questionId, result}) => {
  return (dispatch) => {
    return database.ref(`players/${uid}/questions/${questionId}`).update({result})
  }
}
