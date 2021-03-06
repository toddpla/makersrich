import database from '../firebase/firebase'

export const getQuestion = (question) => ({
  type: 'GET_QUESTION',
  question
})

export const clearQuiz = () => ({
  type: 'CLEAR_QUIZ',
  quiz: {}
})

// needs to be moved to firebase function
export const startGetQuestion = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`players/${uid}/questions`).once('value').then((playerQuestionsSnapshot) => {
      const playerQuestions = []
      playerQuestionsSnapshot.forEach(playerQuestionsChildSnapshot => {
        playerQuestions.push(playerQuestionsChildSnapshot.key)
      })
      return database.ref('questions').once('value').then((snapshot) => {
        const questions = []
        snapshot.forEach(childSnapshot => {
          questions.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        const availableQuestions = questions.filter(question => {
          return !playerQuestions.includes(question.id)
        })
        if(availableQuestions.length > 0) {
          const index = Math.floor(Math.random() * availableQuestions.length)
          dispatch(getQuestion(availableQuestions[index]))
        }
      })
    }).catch(e => console.log(e))
  }
}

// needs to be moved to firebase function
export const startSendResult = ({uid, questionId, result}) => {
  return (dispatch) => {
    return database.ref(`players/${uid}/questions/${questionId}`).update({result})
  }
}
