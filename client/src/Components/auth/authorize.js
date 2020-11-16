import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase.js";

//this is a context compenent for react to check for authorization upon rerender

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // if the firebase authorization changes use this method to grab the user and put it into state
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  //provider makes this accessible  to children components // provide a component tree of sorts
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
