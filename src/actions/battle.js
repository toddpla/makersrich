import database from '../firebase/firebase'
import { updatePlayer } from './auth'

export const startOnBattle = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`battles/${uid}`).on('value', snap => {
      console.log(snap.val());
      dispatch(updatePlayer({battle: snap.val()}))
    })
  }
}
