import * as firebase from 'firebase';

// development environemnt
// const config = {
//   apiKey: "AIzaSyCujvkUHO5pOnh5hQ44JvJILFEoR916zvs",
//   authDomain: "proof-of-work.firebaseapp.com",
//   databaseURL: "https://proof-of-work.firebaseio.com",
//   projectId: "proof-of-work",
//   storageBucket: "",
//   messagingSenderId: "852831365773"
// };

// environemnt variables
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

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
  githubAuthProvider,
  database as default,
  subscribe
};
