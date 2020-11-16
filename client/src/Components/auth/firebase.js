import app from "firebase/app";
import "firebase/auth";

//initalize firebase app
const firebaseApp = app.initializeApp({
      apiKey: "AIzaSyCw26Py2yhWince6o1B_Xp-lDY2tDDpABM",
      authDomain: "login-auth-3bd43.firebaseapp.com",
      databaseURL: "https://login-auth-3bd43.firebaseio.com",
      projectId: "login-auth-3bd43",
      storageBucket: "login-auth-3bd43.appspot.com",
      messagingSenderId: "796099292644",
      appId: "1:796099292644:web:28c5a0c9624cc04054ebf1",
      measurementId: "G-C67SR115V0",
});

export default firebaseApp;