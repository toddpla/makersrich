import database, { firebase } from '../firebase/firebase'
import { updatePlayer } from './auth'
import moment from 'moment'


export const enterBattle = (opponent) => ({
  type: "ENTER_BATTLE",
  opponent
})

export const startEnterBattle = (opponent) => {
  return (dispatch, getState) => {
    const player = getState().auth
    let updates = {}
    updates[`battles/${player.uid}`] = {
      opponentUid: opponent.uid,
      opponentName: opponent.displayName,
      created_at: firebase.database.ServerValue.TIMESTAMP
    }
    updates[`battles/${opponent.uid}`] = {
      opponentUid: player.uid,
      opponentName: player.displayName,
      created_at: firebase.database.ServerValue.TIMESTAMP
    }
    return database.ref().update(updates).then(() => {
      dispatch(enterBattle(opponent))
    })
  }
}

export const startCheckOpponentCanBattle = (opponent) => {
  return (dispatch) => {
    return database.ref(`battles/${opponent.uid}`).once('value').then(snap => {
      return !snap.exists()
    })
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
