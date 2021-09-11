import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../../assets/img/payment-crypto.jpg'
import ImageDark from '../../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Label, Input, Button,Alert  } from '@windmill/react-ui'
import {useAuth} from './../../context/AuthContext'
function Login({ message = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMessage] = useState(message);
  const { signInWithEmailPass,signInWithGoogle } = useAuth();

  const history = useHistory();

  const handleSubmit = async (email, password) => {
    try {
      if (email != '' && password != '') {
        setMessage('')
        if (await signInWithEmailPass(email, password)) {
          history.push('/app')
        }
      } else {
        setMessage('Please check the data you entered.')
      }
    } catch (error) {
      setMessage(error.message)
      // alert(error.message)
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageLight}
              alt="Office"
            />
          </div>
          <main className={`flex items-center justify-center p-6 sm:p-12 md:w-1/2 ${(msg == '') ? ``:`border-red-700 border-t-4 border-b-4`}}`}>
            <div className="w-full">
              <h2 className="mb-2 text-lg font-bold text-blue-800 dark:text-gray-200 text-center">Optimo Investments</h2>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">Sign In</h1>
              <div className="my-3 px-4 text-sm text-red-900 py-2 bg-red-50 rounded" hidden={(msg)==''}>
                {msg}
              </div>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" valid={(email == '') ? false : true} value={email} onInput={e => setEmail(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="***************" valid={(password == '') ? false : true} value={password} onInput={e => setPassword(e.target.value)} />
              </Label>

              <Button className="mt-4" block onClick={()=>handleSubmit(email,password)}>
                Sign in
              </Button>

              <hr className="my-8" />
{/* 
              <Button block layout="outline" onClick={()=>signInWithGoogle()}>
                Sign in with Google
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
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

export default Login
