
import firebase from 'firebase';
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messageSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
})
firebase.analytics()
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthentcated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true)
 
  const signInWithGoogle = async() =>{
    const result = await  firebase.auth().signInWithPopup()
    if(result.user.uid !=null) {
      setUser(result.user)
      if(!result.user.emailVerified) {
        result.user.sendEmailVerification();
      }
      setAuthentcated(true);
      return true;
    } else {
      return false;
    }
  }
  
  const signInWithEmailPass = async (email,pass) =>{
    const result = await  firebase.auth().signInWithEmailAndPassword(email,pass)
    if(result.user.uid !=null) {
      setUser(result.user)
      if(!result.user.emailVerified) {
        result.user.sendEmailVerification();
      }
      setAuthentcated(true);
      return true;
    } else {
      return false;
    }
  }

  const signUpWithEmailPass = async (email,pass) =>{
    return firebase.auth().createUserWithEmailAndPassword(email,pass).then(result => {
      setUser(result.user)
      result.user.sendEmailVerification();
      setAuthentcated(true);
      return true;
    })
  }

  const resetPassword = (email) => {
     return firebase.auth().sendPasswordResetEmail(email,{url:"https://my.optimoinvest.com/login",handleCodeInApp:true})
  }

  const updateProfile = async (data) => {
    const localStorage = window.localStorage;
    data['ref_id'] = await localStorage.getItem('ref')
    return await firebase.firestore().collection('uData').doc(user.uid).update({ ...data, isprofileUpdated: true })
  }

  const logOut = () => {
    return firebase.auth().signOut().then(() => {
      setUser(null);
      setAuthentcated(false);
    });
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setIsAuthenticating(false)
    });
    return () => unsubscribe();
  }, [])

  const values = {
    user,
    setUser,
    isAuthenticating,
    isAuthenticated,
    signInWithEmailPass,
    signUpWithEmailPass,
    signInWithGoogle,
    updateProfile,
    resetPassword,
    logOut
  }

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  )
}