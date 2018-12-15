import database, { firebase, googleAuthProvider, subscribe } from '../firebase/firebase'
import { store } from '../index.js'

export const login = (uid, player) => ({
    type: 'LOGIN',
    player: {
      uid,
      top: 0,
      left: 0,
      level: 1,
      cash: 0,
      inventory: {
        ruby: [],
        bean: [],
        key: [],
      },
      ...player
    }
})

export const startLogin = (uid) => {
  return (dispatch) => {
    return database.ref(`players/${uid}`).once('value').then((snapshot) => {
      const playerData = snapshot.val()

      if (playerData.inventory !== undefined) {
        const inventory = {
          ruby: playerData.inventory.ruby !== undefined ?
                  Object.keys(playerData.inventory.ruby).map((rubyKey) => {
                    return playerData.inventory.ruby[rubyKey]
                  }) : [],
          bean: playerData.inventory.bean !== undefined ?
                  Object.keys(playerData.inventory.bean).map((beanKey) => {
                    return playerData.inventory.bean[beanKey]
                  }) : [],
          key: playerData.inventory.key !== undefined ?
                Object.keys(playerData.inventory.key).map((keyKey) => {
                  return playerData.inventory.key[keyKey]
                }) : [],
          miscellaneous: playerData.inventory.miscellaneous !== undefined ?
                Object.keys(playerData.inventory.miscellaneous).map((miscellaneousKey) => {
                  return playerData.inventory.miscellaneous[miscellaneousKey]
                }) : []

        }
        playerData.inventory = inventory
      }

      dispatch(login(uid, playerData))
      subscribe()
    })
  }
}

export const startGoogleLogin = () => {
  return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
    database.ref(`players/${result.user.uid}`).once('value').then((snapshot) => {
      store.dispatch(login(result.user.uid, snapshot.val()))
      subscribe()
    })
  })
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout())
    window.location.reload();
    return firebase.auth().signOut()
  }
}

export const updatePlayer = (updates) => ({
  type: "UPDATE_PLAYER",
  updates
})

export const startUpdatePlayer = (uid, updates) => {
  return (dispatch) => {
    dispatch(updatePlayer(updates))
    return database.ref(`players/${uid}`).update(updates)
  }
}

export const addInventoryItem = (itemRef, item) => ({
  type: "ADD_INVENTORY_ITEM",
  itemRef,
  item
})

export const startAddInventoryItem = (itemRef, item) => {
  return (dispatch) => {
    return database.ref(`players/${firebase.auth().currentUser.uid}/inventory/${itemRef}/${item.id}`).update(item)
      .then(() => {
        dispatch(addInventoryItem(itemRef, item))
      })
  }
}
