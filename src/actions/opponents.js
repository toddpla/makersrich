import database from '../firebase/firebase'

export const addOpponent = (opponent) => ({
  type: 'ADD_OPPONENT',
  opponent
})

export const startOnAddOpponent = () => {
  return (dispatch, getState) => {
    const player = getState().auth
    return database.ref('players').on('child_added', (snapshot) => {
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
  return (dispatch, getState) => {
    const player = getState().auth
    return database.ref('players').on('child_removed', (snapshot) => {
      dispatch(removeOpponent(snapshot.key))
    })
  }
}
