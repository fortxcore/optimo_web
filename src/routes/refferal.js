
import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'

const Index = () => {
  const location = useLocation()
  checkRef(location)
  return <Redirect to="/create-account"/>
}

async function checkRef(location) {
  const localStorage = window.localStorage;
  if (await localStorage.getItem('ref') == null) {
    const ref = location.search.split('?')[1]
    if (ref !== null) {
      await localStorage.setItem('ref', ref)
    }
  }
}

export default Index