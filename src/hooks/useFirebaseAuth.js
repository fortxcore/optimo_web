import { useAuth } from "../context/AuthContext"
import React, { useEffect, useMemo, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase'
import UpdateForm from "../pages/auth/profile-info";
import ThemedSuspense from '../components/ThemedSuspense'
import { Redirect, Route } from "react-router-dom";

const FAuth = ({ path, children, ...rest }) => {
  const { user,setUser } = useAuth();
  const [value, loading, error] = useDocument(firebase.firestore().doc(`uData/${user.uid}`), {});
  const [newUser, setNewUser] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [ppNotFoundYet, setNotFoundYet] = useState(false)
  useEffect(() => {
    if (!loading) {
      if (!error) {
        try {
          if(!value.data()['isA']) {
            setIsBanned(true)
          }
          if (!value.data()['isprofileUpdated']) {
            setNotFoundYet(false)
            setNewUser(true)
          } 
          setUser({...user,...value.data()})
        } catch (error) {
          setNotFoundYet(true)
        }
      }
    }
  }, [loading, value, error, ppNotFoundYet])

  if(isBanned) {
    return <Redirect to="/banned"/>
  }
  return (
    <div>
      {ppNotFoundYet && <ThemedSuspense />}
      {error && <ThemedSuspense />}
      {loading && <ThemedSuspense />}
      {value && (newUser) ? <UpdateForm alert={true} /> : <Route path={path} component={children} />}
    </div>
  );
}

export default FAuth