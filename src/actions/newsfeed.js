import database, {firebase}  from '../firebase/firebase'

export const startSendNewsfeedMessage = (message) => {
  return (dispatch, getState) => {
    const player = getState().auth
    database.ref('newsfeed').push({
      created_at: firebase.database.ServerValue.TIMESTAMP,
      message: message,
      created_by: player.uid
    })
  }
}
