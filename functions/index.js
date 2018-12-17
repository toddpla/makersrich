const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.startBattle = functions.https.onCall((data, context) => {
  const playerOneUid = data.playerOneUid
  const playerTwoUid = data.playerTwoUid
  admin.database().ref(`/battles/${playerOneUid}`).set({'opponentUid': playerTwoUid})
  admin.database().ref(`/battles/${playerTwoUid}`).set({'opponentUid': playerOneUid})
})


exports.useWeapon = functions.https.onCall((data, context) => {
  //
  const opponentWeapon = 'rock'
  //
  const weapon = data.weapon;
  const uid = context.auth.uid;
  let result = 'false'
  const weaponsMatrix = {'rock': ['scissors'], 'paper': ['rock'], 'scissors': ['paper']}
  if (Object.keys(weaponsMatrix).includes(opponentWeapon)) {
    result = weaponsMatrix[weapon].includes(opponentWeapon)
  }
  admin.database().ref(`/battles/`).push({weapon})




  //
  // return admin.database().ref(`/battles/${uid}`).once('value').then(snap => {
  //   const battle = snap.val()
  //   if (battle.opponentUid !== undefined) {
  //     return admin.database().ref(`/battles/${battle.opponentUid}/weapon`).once('value').then(weaponSnap => {
  //       const opponentWeapon = weaponSnap.val();
  //       let winningUid = battle.opponentUid
  //       let losingUid = uid
  //       if (hasWon(weapon, opponentWeapon)) {
  //         winningUid = uid
  //         losingUid = battle.opponentUid
  //       }
  //       admin.database().ref(`/players/${winningUid}/cash`).once('value').then(cashSnap => {
  //         return admin.database().ref(`/players/${winningUid}/cash`).set(cashSnap.val() + 10)
  //       }).catch((err) => {
  //         throw new functions.https.HttpsError('unknown', err.message, err)
  //       })
  //       admin.database().ref(`/players/${losingUid}/cash`).once('value').then(opponentCashSnap => {
  //         return admin.database().ref(`/players/${losingUid}/cash`).set(opponentCashSnap.val() - 10)
  //       }).catch((err) => {
  //         throw new functions.https.HttpsError('unknown', err.message, err)
  //       })
  //       admin.database().ref(`/battles/${winningUid}`).remove()
  //       admin.database().ref(`/battles/${losingUid}`).remove()
  //       return admin.database().ref('/notifications/').push({message: `${winningUid} just beat ${losingUid} in a battle`})
  //     }).catch((err) => {
  //       throw new functions.https.HttpsError('unknown', err.message, err)
  //     })
  //   } else {
  //     return admin.database().ref(`/battles/${uid}/weapon`).set(weapon)
  //   }
  // }).catch((err) => {
  //   throw new functions.https.HttpsError('unknown', err.message, err)
  // })
})


// exports.useWeapon = functions.https.onCall((data, context) => {
//   const weapon = data.weapon;
//   const uid = context.auth.uid;
//   return admin.database().ref(`/battles/${uid}`).once('value').then(snap => {
//     const battle = snap.val()
//     if (battle.opponentUid !== undefined) {
//       return admin.database().ref(`/battles/${battle.opponentUid}/weapon`).once('value').then(weaponSnap => {
//         const opponentWeapon = weaponSnap.val();
//         let winningUid = battle.opponentUid
//         let losingUid = uid
//         if (hasWon(weapon, opponentWeapon)) {
//           winningUid = uid
//           losingUid = battle.opponentUid
//         }
//         admin.database().ref(`/players/${winningUid}/cash`).once('value').then(cashSnap => {
//           return admin.database().ref(`/players/${winningUid}/cash`).set(cashSnap.val() + 10)
//         }).catch((err) => {
//           throw new functions.https.HttpsError('unknown', err.message, err)
//         })
//         admin.database().ref(`/players/${losingUid}/cash`).once('value').then(opponentCashSnap => {
//           return admin.database().ref(`/players/${losingUid}/cash`).set(opponentCashSnap.val() - 10)
//         }).catch((err) => {
//           throw new functions.https.HttpsError('unknown', err.message, err)
//         })
//         admin.database().ref(`/battles/${winningUid}`).remove()
//         admin.database().ref(`/battles/${losingUid}`).remove()
//         return admin.database().ref('/notifications/').push({message: `${winningUid} just beat ${losingUid} in a battle`})
//       }).catch((err) => {
//         throw new functions.https.HttpsError('unknown', err.message, err)
//       })
//     } else {
//       return admin.database().ref(`/battles/${uid}/weapon`).set(weapon)
//     }
//   }).catch((err) => {
//     throw new functions.https.HttpsError('unknown', err.message, err)
//   })
// })


const hasWon = (weapon, opponentWeapon) => {
  const weaponsMatrix = {'rock': ['scissors'], 'paper': ['rock'], 'scissors': ['paper']}
  if (Object.keys(weaponsMatrix).includes(opponentWeapon)) {
    return weaponsMatrix[weapon].includes(opponentWeapon)
  } else {
    return false
  }
}
