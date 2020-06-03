import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC7Rd45LopsIyYUQ2i29ZakbnHa6y8G3MA",
  authDomain: "flutter-494c2.firebaseapp.com",
  databaseURL: "https://flutter-494c2.firebaseio.com",
  projectId: "flutter-494c2",
  storageBucket: "flutter-494c2.appspot.com",
  messagingSenderId: "266699935120",
  appId: "1:266699935120:web:9689e31515e07cd3b7b715",
  measurementId: "G-XKPBW915ZZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
