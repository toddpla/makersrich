import database from '../firebase/firebase'

export const setOpponents = (opponents) => {
  return {
    type: 'SET_OPPONENTS',
    opponents
  }
}

export const startSetOpponents = () => {
  return (dispatch, getState) => {
    return database.ref('players').once('value').then((snapshot) => {
      const player = getState().auth
      const opponents = [];
      snapshot.forEach((childSnapshot) => {
        const opponent = childSnapshot.val()
        if (childSnapshot.key !== player.uid && opponent.level === player.level && opponent.state === 'online') {
          opponents.push({
            uid: childSnapshot.key,
            ...opponent
          });
        }
      });
      dispatch(setOpponents(opponents));
    }).catch((e) => console.log(e))
  }
}

export const startOnOpponents = () => {
  return (dispatch, getState) => {
    return database.ref('players').on('value', (snapshot) => {
      const player = getState().auth
      const opponents = [];
      snapshot.forEach((childSnapshot) => {
        const opponent = childSnapshot.val()
        if(childSnapshot.key !== player.uid && opponent.level === player.level && opponent.state === 'online') {
          opponents.push({
            uid: childSnapshot.key,
            ...opponent
          });
        }
      });
      dispatch(setOpponents(opponents));
    })
  }
}
