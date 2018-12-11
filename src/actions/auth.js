import { firebase, googleAuthProvider, gitHubAuthProvider, subscribe } from '../firebase/firebase'

export const login = (uid) => ({
  type: 'LOGIN',
  uid
})

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
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
  }
}
