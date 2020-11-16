import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  ///const [currentEmail, setCurrentEmail] = useState(null);
  


  // if the firebase authorization changes use this method to grab the user and put it into state
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      //setCurrentEmail(user.email)
  
    });
  }, []);


  //provider makes this asseccible to children components // provide a component tree of sorts
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
