import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCF80aVPSwldshmZhuATsa5t2hKk5YDeSU",
    authDomain: "fitbuddy-77dfc.firebaseapp.com",
    databaseURL: "https://fitbuddy-77dfc.firebaseio.com",
    projectId: "fitbuddy-77dfc",
    storageBucket: "fitbuddy-77dfc.appspot.com",
    messagingSenderId: "613913011935",
    appId: "1:613913011935:web:e3e0398ac5e94556f1eb6a",
    measurementId: "G-148J9C82XH"
  };

  class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth;
      this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
      this.auth.createUserWithEmailAndPassword(email, password);
    }

    doSignInWithEmailAndPassword = (email, password) => {
      this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignOut = () => {
      this.auth.signOut();
    }

    doPasswordReset = email => {
      this.auth.sendPasswordResetEmail(email);
    }
  }


export default Firebase;