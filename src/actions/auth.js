import database, { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase'

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
  return (dispatch, getState) => {
    // const uid = getState().auth.uid
    return database.ref(`players/${uid}`).once('value').then((snapshot) => {
      const playerData = snapshot.val() || {}
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
    })
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout())
    return firebase.auth().signOut()
  }
}

export const updatePlayer = (updates) => ({
  type: "UPDATE_PLAYER",
  updates
})

export const startUpdatePlayer = (updates) => {
  return (dispatch, getState) => {
    dispatch(updatePlayer(updates))
    const uid = getState().auth.uid
    return database.ref(`players/${uid}`).update(updates)
  }
}

export const addInventoryItem = (itemRef, item) => ({
  type: "ADD_INVENTORY_ITEM",
  itemRef,
  item
})

export const startAddInventoryItem = (itemRef, item) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`players/${uid}/inventory/${itemRef}/${item.id}`).update(item)
      .then(() => {
        dispatch(addInventoryItem(itemRef, item))
      })
  }
}

export const startDebitPlayer = (amount) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`players/${uid}/cash`).once('value').then((snapshot) => {
      const currentCash = snapshot.val() || 0
      dispatch(startUpdatePlayer({cash: currentCash - amount}))
    })
  }
}

export const startCreditPlayer = (amount) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`players/${uid}/cash`).once('value').then((snapshot) => {
      const currentCash = snapshot.val() || 0
      dispatch(startUpdatePlayer({cash: currentCash + amount}))
    })
  }
}
