import database, { firebase, googleAuthProvider, subscribe } from '../firebase/firebase'

export const login = (uid, player) => ({
  type: 'LOGIN',
  player: {
    uid,
    top: 0,
    left: 0,
    ruby: [],
    javaBeans: [],
    key: [],
    ...player
  }
})

export const startLogin = (uid) => {
  return (dispatch) => {
    return database.ref(`players/${uid}`).once('value').then((snapshot) => {
      dispatch(login(uid, snapshot.val()))
      subscribe()
    })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      database.ref(`players/${result.user.uid}`).once('value').then((snapshot) => {
        dispatch(login(result.user.uid, snapshot.val()))
        subscribe()
      })
    })
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut()
    dispatch(logout())
  }
}

export const updatePlayer = (updates) => ({
  type: "UPDATE_PLAYER",
  updates
})

export const startUpdatePlayer = (updates) => {
  return (dispatch) => {
    dispatch(updatePlayer(updates))
    return database.ref(`players/${firebase.auth().currentUser.uid}`).update(updates)
  }
}

export const addInventoryItem = (itemRef, item) => ({
  type: "ADD_INVENTORY_ITEM",
  itemRef,
  item
})

export const startAddInventoryItem = (itemRef, itemId) => {
  return (dispatch) => {
    return database.ref(`players/${firebase.auth().currentUser.uid}/${itemRef}/${itemId}`).update({status: 1}).then(() => {
      dispatch(addInventoryItem(itemRef, itemId))
    })
  }
}
