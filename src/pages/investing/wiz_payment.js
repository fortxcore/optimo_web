import React from 'react'
import { Link } from 'react-router-dom'

import ImageDark from '../../assets/img/payment-crypto.jpg'
import { GithubIcon, MoneyIcon, TwitterIcon } from '../../icons'
import { Label, Input, Button, Select } from '@windmill/react-ui'
import { useAuth } from '../../context/AuthContext'

function PaymentScreen() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <p className="text-right">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/app/dashboard"
                >
                  Go Back
                </Link>
              </p>
              <Payment />
            </div>
          </main>
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageDark}
              alt="Payment Method"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Payment Method"
            />
          </div>
        </div>
      </div>
    </div>
  )
}



function Payment() {
  const { user } = useAuth()

  return <>
    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Payment Method</h1>
    <p className="mb-4 text-xs text-justify text-gray-700 dark:text-gray-200">You need to specify the Currency and a wallet address for this Investment package. Your money and bonuses of this investment package will be sent to the selected address.</p>
    <Button block layout="outline">
      <MoneyIcon className="w-4 h-4 mr-2" aria-hidden="true" />
      Default Payment Method
    </Button>
    <div className="p-2 rounded-lg bg-blue-100 text-blue-900 overflow-y-auto text-sm"><p>{user['defaultCurrency']} address : {user['defaultAddress']}</p></div>
    <hr className="my-8" />
    <p className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">or Use your Crypto Wallet to Deposit</p>
    <Label className="mt-4">
      <span>Wallet Currency </span>
      <Select className="mt-1">
        <option value="...">Select</option>
        <option value="btc">BTC</option>
        <option value="eth">ETHERIUM</option>
        <option value="USDTERC20">USDT</option>
      </Select>
    </Label>
    <Label className="mt-4">
      <span>Wallet Address</span>
      <Input className="mt-1" type="text" placeholder="Wallet Address" />
    </Label>

    <Button className="mt-4" block tag={Link} to="/app">
      Save and Continue
    </Button>
  </>
}

export default PaymentScreen

// valid={(walletCurrency == '') ? false : true} value={walletCurrency} onChange={e => setWalletCurrency(e.target.value)}