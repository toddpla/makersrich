import database from '../firebase/firebase'
import { updatePlayer } from './auth'
import moment from 'moment'


export const createBattle = (opponent) => ({
  type: "CREATE_BATTLE",
  opponent
})

export startCreateBattle = (opponent) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    
    return database.ref(`battles/&${uid}`).once('value').then(snap =>)
  }
}

export const startOnBattle = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`battles/${uid}`).on('value', snap => {
      let battle = snap.val()
      if (battle && battle.created_at && moment(battle.created_at).add(5, 'seconds') > moment()) {
        dispatch(updatePlayer({battle}))
      } else {
        dispatch(updatePlayer({battle: undefined}))
      }
    })
  }
}
