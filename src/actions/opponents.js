import database, { firebase } from '../firebase/firebase'
import { store } from '../index'

export const setOpponents = (opponents) => {
  const player = store.getState().auth
  return {
    type: 'SET_OPPONENTS',
    opponents: opponents.filter(opponent => opponent.level && player.level && opponent.state === 'online' )
  }
}

export const startSetOpponents = () => {
  return (dispatch) => {
    return database.ref('players').once('value').then((snapshot) => {
      const player = store.getState().auth
      const opponents = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key !== player.uid) {
          opponents.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        }
      });
      dispatch(setOpponents(opponents));
    }).catch((e) => console.log(e))
  }
}

export const startOnOpponents = () => {
  return (dispatch) => {
    return database.ref('players').on('value', (snapshot) => {
      const player = store.getState().auth
      const opponents = [];
      snapshot.forEach((childSnapshot) => {
        const opponent = childSnapshot.val()
        opponent.id = childSnapshot.key
        if(opponent.id !== player.uid) {
          opponents.push({
            ...opponent
          });
        }
      });
      dispatch(setOpponents(opponents));
    })
  }
}
