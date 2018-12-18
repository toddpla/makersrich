import database, {firebase}  from '../firebase/firebase'

export const startSendMessage = (message) => {
 return (dispatch, getState) => {
   const player = getState().auth
   database.ref('messages').push({
     created_at: firebase.database.ServerValue.TIMESTAMP,
     message: message,
     created_by: player.uid
   })
 }
}

export const startOnMessages = () => {
  return (dispatch) => {
    database.ref('messages')
      .orderByChild('created_at')
      .on('child_added', snapshot => {
        dispatch(addMessage(snapshot.val()))
      })
  }
}

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message
})
