import database, { currentUser } from '../firebase/firebase'

export const addPlayer = (player) => ({
  type: "ADD_PLAYER",
  player: {
    ...player,
    top: 0,
    left: 0
  }
})

// export const startAddPlayer = (playerData = {}) => {
//   return (dispatch) => {
//     const {
//       top = 0,
//       left = 0
//     } = playerData;
//     const player = {
//       top,
//       left
//     }
//     return database.ref(`players/${currentUser().uid}`).update(player)
//   }
// }

export const updatePlayer = (updates) => ({
  type: "UPDATE_PLAYER",
  id: currentUser().uid,
  updates
})

export const startUpdatePlayer = (updates) => {
  console.log(updates)
  return (dispatch) => {
    return database.ref(`players/${currentUser().uid}`).update(updates).then(() => {
      // dispatch(updatePlayer(updates))
    })
  }
}

export const setPlayers = players => ({
  type: "SET_PLAYERS",
  players
})

export const startOnPlayers = () => {
  return (dispatch) => {
    return database.ref('players').on('value', snapshot => {
      const players = [];
      snapshot.forEach(childSnapshot => {
        players.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setPlayers(players))
    })
  }
}
