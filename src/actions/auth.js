import database, { firebase, googleAuthProvider, subscribe } from '../firebase/firebase'

export const login = (player) => ({
  type: 'LOGIN',
  player
})

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      store.dispatch(login(database.ref(`players/${result.user.uid}`)))
      subscribe()
    })
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
    store.dispatch(logout())
  }
}
