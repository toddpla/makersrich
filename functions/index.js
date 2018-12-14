const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// exports.checkPlayerCollision = functions.database.ref('/players')
//   .onWrite('child_changed', (snapshot, context) => {
//     let player = snapshot.val()
//     player.uid = snapshot.ref
//     functions.database.ref('/players/')
//       .where('top', '==', player.top)
//       .where('left', '==', player.left)
//       .where('level', '==', player.level)
//       .limitToLast(1)
//       .once('value').then((snapshot) => {
//         let opponent;
//         snapshot.forEach((childSnapshot) => {
//           opponent = childSnapshot.val()
//           opponent.uid = childSnapshot.key
//         })
//       if (opponent !== undefined) {
//         functions.database.ref('/games/rps').push({
//           [player.uid]: {
//             hand: "empty"
//           },
//           [opponent.uid]: {
//             hand: "empty"
//           }
//         })
//       }
//       return
//     }).catch((e) => console.log(e))
//   })
