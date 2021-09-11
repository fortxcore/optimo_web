import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../../assets/img/forgot-password-office.jpeg'
import ImageDark from '../../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { useAuth } from '../../context/AuthContext'

function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('');
  const history = useHistory()
  async function handleSubmit() {
    if (email != '') {
      await resetPassword(email);
      alert('Please check your email to reset password.')
      history.push('/login')
    }
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>

              <Label>
                <span>Email</span>
                <Input className="mt-1" placeholder="example@domain.com" onInput={(v) => setEmail(v.target.value)} />
              </Label>

              <Button onClick={()=>handleSubmit()}  className="mt-4">
                Recover password
              </Button>
              <p className="mt-4">
                <a
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  href="https://optimoinvest.com/Optimo%20Privacy.html"
                >
                  Privacy Policy
                </a> ▪ <a
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  href="https://optimoinvest.com/Optimo%20Terms.html"
                >
                 Terms and Conditions
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
