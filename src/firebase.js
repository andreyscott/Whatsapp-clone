// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8XTnrWbxY_mddVEKZxoKkSb7GajdlCs4",
  authDomain: "whatsapp-clone-68c8d.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-68c8d.firebaseio.com",
  projectId: "whatsapp-clone-68c8d",
  storageBucket: "whatsapp-clone-68c8d.appspot.com",
  messagingSenderId: "521752572430",
  appId: "1:521752572430:web:22f2ae3609c4dab23e825f",
  measurementId: "G-QVDZEGNEVH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider}

export default db;