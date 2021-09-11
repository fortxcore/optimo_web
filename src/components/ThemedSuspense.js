import React from 'react'
import Spinner from '../assets/img/Iphone-spinner-2.gif'

function ThemedSuspense() {
  return (
    <div className="w-full h-screen text-center py-64 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900 animate-pulse">
      <h1>Optimo Investments</h1>
      <p>Loading</p>
    </div>
  )
}

export default ThemedSuspense
