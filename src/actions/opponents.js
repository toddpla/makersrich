import database from '../firebase/firebase'

export const addOpponent = (opponent) => ({
  type: 'ADD_OPPONENT',
  opponent
})

export const startOnAddOpponent = () => {
  return (dispatch) => {
    return database.ref('players')
      .orderByChild('state')
      .equalTo('online')
      .on('child_added', (snapshot) => {
      dispatch(addOpponent({
        uid: snapshot.key,
        ...snapshot.val()
      }))
    })
  }
}

export const removeOpponent = (uid) => ({
  type: 'REMOVE_OPPONENT',
  uid
})

export const startOnRemoveOpponent = () => {
  return (dispatch) => {
    return database.ref('players')
      .orderByChild('state')
      .equalTo('online')
      .on('child_removed', (snapshot) => {
      dispatch(removeOpponent(snapshot.key))
    })
  }
}

// export const startOnOnlinePlayers = () => {
//   return (dispatch) => {
//     return database.ref('players')
//       .orderByChild('state')
//       .equalTo('online')
//       .on('value', (snap) => {
//
//       })
//   }
// }

//
// export const startOnAddOpponent = () => {
//   return (dispatch) => {
//     return database.ref('players')
//       .orderByChild('state')
//       .equalTo('online')
//       .on('child_added', (snapshot) => {
//         const connection = database.ref(`players/${snapshot.key}`).on('value', (childSnap) => {
//           // dispatch(updateOpponent())
//           return {
//             ...childSnap.val()
//           }})
//       dispatch(addOpponent({
//         uid: snapshot.key,
//         connection
//       }))
//     })
//   }
// }
//
//
// export const startOnRemoveOpponent = () => {
//   return (dispatch) => {
//     return database.ref('players')
//     .orderByChild('state')
//     .equalTo('online')
//     .on('child_removed', (snapshot) => {
//       // console.log('startOnRemoveOpponent', snapshot.val());
//       dispatch(removeOpponent(snapshot.key))
//     })
//   }
// }
