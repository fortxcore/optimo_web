import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../../assets/img/login-office.jpeg'
import ImageDark from '../../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Label, Input, Button } from '@windmill/react-ui'

function PackageConfirmation() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto items-center justify-center p-6 sm:p-12">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Package Confirmation</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="***************" />
              </Label>

              <Button className="mt-4" block tag={Link} to="/app">
                Log in
              </Button>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

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
            </div>

    
        </div>
      </div>
    </div>
  )
}

export default PackageConfirmation
