import * as firebase from 'firebase';

// production environemnt
// const config = {
//   apiKey: "AIzaSyB01zAvpV9TaYgMnfDbW4fwbRPPP9Zzy9I",
//   authDomain: "proof-of-work-production.firebaseapp.com",
//   databaseURL: "https://proof-of-work-production.firebaseio.com",
//   projectId: "proof-of-work-production",
//   storageBucket: "proof-of-work-production.appspot.com",
//   messagingSenderId: "1085838790292"
// };

// development environemnt
const config = {
  apiKey: "AIzaSyCujvkUHO5pOnh5hQ44JvJILFEoR916zvs",
  authDomain: "proof-of-work.firebaseapp.com",
  databaseURL: "https://proof-of-work.firebaseio.com",
  projectId: "proof-of-work",
  storageBucket: "",
  messagingSenderId: "852831365773"
};

// // environemnt variables
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
// };

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


const subscribe = () => {
  const currentUser = firebase.auth().currentUser;
  const userStatusDatabaseRef = firebase.database().ref(`/status/${currentUser.uid}`);
  const isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  const isOnlineForDatabase = {
      state: 'online',
      displayName: currentUser.displayName,
      last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  firebase.database().ref('.info/connected').on('value', function(snapshot) {
      if (snapshot.val() === false) {
          return;
      };
      userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function() {
          userStatusDatabaseRef.update(isOnlineForDatabase);
      });
    })
}

export {
  firebase,
  googleAuthProvider,
  database as default,
  subscribe
};
