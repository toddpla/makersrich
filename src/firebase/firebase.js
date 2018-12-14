import * as firebase from 'firebase';

// development environemnt
const config = {
  apiKey: "AIzaSyCujvkUHO5pOnh5hQ44JvJILFEoR916zvs",
  authDomain: "proof-of-work.firebaseapp.com",
  databaseURL: "https://proof-of-work.firebaseio.com",
  projectId: "proof-of-work",
  storageBucket: "",
  messagingSenderId: "852831365773"
};


firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const subscribe = () => {
  const currentUser = firebase.auth().currentUser;
  const userStatusDatabaseRef = firebase.database().ref(`/players/${currentUser.uid}`);
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
