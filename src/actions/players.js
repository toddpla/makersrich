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
