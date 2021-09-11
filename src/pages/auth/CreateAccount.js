import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../../assets/img/bitcoin-bg-chart.jpg'
import ImageDark from '../../assets/img/bitcoin-bg-chart.jpg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import { useAuth } from '../../context/AuthContext'

function SignUp({ message = '' }) {

  const [email, setEmail] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPass, setCPass] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMessage] = useState(message);
  const { signUpWithEmailPass, signInWithGoogle } = useAuth();
  const [privacy, setPrivacy] = useState(false);
  const history = useHistory();

  const handleSubmit = async (email, password) => {
    try {
      if(privacy) {
        if (email != '' && password != '') {
          if (email != cEmail || password != cPass) {
            setMessage('You need to confirm your email and password.')
          } else {
            setMessage('')
            if (await signUpWithEmailPass(email, password)) {
              history.push('/profile-setup')
            }
          }
        } else {
          setMessage('Please check the data you entered.')
        }
      } else {
        setMessage('You need to accept our Terms and Privacy Policy')
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
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h2 className="mb-2 text-lg font-bold text-blue-800 dark:text-gray-200 text-center">Optimo Investments</h2>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">Sign Up</h1>
              <div className="my-3 px-4 text-sm text-red-900 py-2 bg-red-50 rounded" hidden={(msg) == ''}>
                {msg}
              </div>
              <Label className="mt-4">
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" valid={(email == '') ? false : true} value={email} onInput={e => setEmail(e.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Confirm Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" valid={((email != '' && cEmail != '') && email != cEmail) ? null : true} value={cEmail} onInput={e => setCEmail(e.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" placeholder="***************" type="password" valid={(password == '') ? false : true} value={password} onInput={e => setPassword(e.target.value)} />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input className="mt-1" placeholder="***************" type="password" valid={((password != '' && cPass != '') && password != cPass) ? false : true} value={cPass} onInput={e => setCPass(e.target.value)} />
              </Label>

              <Label className="mt-3" check>
                <Input type="checkbox" valid={privacy} onChange={(e)=>setPrivacy(e.target.value)}/>
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button onClick={() => handleSubmit(email, password)} block className="mt-4">
                Create account
              </Button>

              <hr className="my-4" />

              {/* <Button block layout="outline">
                Sign up with Google
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
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

export default SignUp
