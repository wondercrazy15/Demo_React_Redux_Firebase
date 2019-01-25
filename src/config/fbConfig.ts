import * as firebase from 'firebase';

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyBwoAPVJA1zsBgFBxO5X4AB22uEeYUPIN0",
  authDomain: "reduxdb-c9bf2.firebaseapp.com",
  databaseURL: "https://reduxdb-c9bf2.firebaseio.com",
  projectId: "reduxdb-c9bf2",
  storageBucket: "reduxdb-c9bf2.appspot.com",
  messagingSenderId: "790542180334"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.firestore().settings(settings);
}

export default firebase;
