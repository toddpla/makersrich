import database from '../firebase/firebase'

export const setPlayers = (players) => ({
  type: 'SET_PLAYERS',
  players
})

export const startSetPlayers = () => {
  return (dispatch) => {
    return database.ref('players').once('value').then((snapshot) => {
      const players = [];
      snapshot.forEach((childSnapshot) => {
        players.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setPlayers(players));
    }).catch((e) => console.log(e))
  }
}

export const addPlayer = (player) => ({
  type: "ADD_PLAYER",
  player: {
    ...player,
    top: 0,
    left: 0,
    inventory: {
      ruby: [],
      javaBeans: []
    }
  }
})
