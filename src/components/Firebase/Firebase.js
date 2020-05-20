import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// below is code for secondary firebase
var firebaseConfig = {
  apiKey: "AIzaSyB-3uE79aaDOj3pQnkibRsfJUXtZhXWEWc",
  authDomain: "fit-buddy-5e92b.firebaseapp.com",
  databaseURL: "https://fit-buddy-5e92b.firebaseio.com",
  projectId: "fit-buddy-5e92b",
  storageBucket: "fit-buddy-5e92b.appspot.com",
  messagingSenderId: "630651897979",
  appId: "1:630651897979:web:3d970dd60cfe2536bf3ade",
  measurementId: "G-VFWZXFQ6VM"
};

// var firebaseConfig = {
//     apiKey: "AIzaSyCF80aVPSwldshmZhuATsa5t2hKk5YDeSU",
//     authDomain: "fitbuddy-77dfc.firebaseapp.com",
//     databaseURL: "https://fitbuddy-77dfc.firebaseio.com",
//     projectId: "fitbuddy-77dfc",
//     storageBucket: "fitbuddy-77dfc.appspot.com",
//     messagingSenderId: "613913011935",
//     appId: "1:613913011935:web:e3e0398ac5e94556f1eb6a",
//     measurementId: "G-148J9C82XH"
//   };

  class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);
    
    
    doSignInWithEmailAndPassword = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);
    
    
    doSignOut = () => 
    this.auth.signOut();
    
    
    doPasswordReset = email => 
    this.auth.sendPasswordResetEmail(email);

    
    
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
    
    addWorkout = (uid, workout) => {
      const ref = this.db.ref().child(`users/${uid}/workouts`);
      ref.push(workout);
    };

    updateWorkout = (uid, workout, workoutKey) => {
      const ref = this.db.ref().child(`users/${uid}/workouts`);
      ref.push(workout)
    };

  }
  
  
  export default Firebase;