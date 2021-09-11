import { Redirect } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React from 'react'
import FAuth from "../hooks/useFirebaseAuth"


const PrivateRoute = ({ path, children, ...rest }) => {
  const { user } = useAuth()
  if(user == null) {
    return (
      <Redirect to="/login"/>
    )
  }
  if (user) {
    return <FAuth {...rest} path={path} >{children}</FAuth>    
  } 
}

export default PrivateRoute;