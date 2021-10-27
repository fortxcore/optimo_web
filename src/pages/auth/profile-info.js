import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../../assets/img/bitcoin-bg-chart.jpg'
import ImageDark from '../../assets/img/bitcoin-bg-chart.jpg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Input, Label, Button, Select } from '@windmill/react-ui'
import ReactCountriesInput from 'react-countries-input'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useDocument, useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

function ProfileSetup({ message = '' }) {
  const { user } = useAuth()
  const [data, loading, error] = useDocument(firebase.firestore().collection(`uData`).doc(user.uid), {})

  const [displayName, setDN] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [walletCurrency, setWalletCurrency] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [msg, setMessage] = useState(message);
  const { updateProfile } = useAuth()
  const [done, setDone] = useState(true)
  const [countries, setCountries] = useState([])
  const [code, setCode] = useState(1)


  const history = useHistory()

  const callAxios = async () => {
    const res = await axios.get("https://restcountries.eu/rest/v2/all?fields=name;callingCodes")
    // setData(res['data']['data']['allProductMedicines'])
    const c = []
    var i = 0;
    res['data'].map(e => {
      c.push({ [i]: { 'name': e.name, 'code': e['callingCodes'][0] } })
      i++
    })
    setCountries(c)
  }

  useEffect(() => {
    try {
      if (data) {
        setAddress1(data.data().address1)
        setDN(data.data().displayName)
        setAddress2(data.data().address2)
        setCity(data.data().city)
        setCountry(data.data().country)
        setPhoneNumber(data.data().phoneNumber)
        setWalletAddress(data.data().defaultAddress)
        setWalletCurrency(data.data().defaultCurrency)
        setDone(true)
      }
    } catch (error) {

    }
  }, [data])

  const handleSubmit = async () => {
    const localStorage = window.localStorage;
    try {
      if (displayName != null && displayName != '' && address1 != null && address1 != '' && city != null && city != '' && country != null && country != '' && phoneNumber != null && phoneNumber != '') {
        setMessage('')
        await updateProfile({
          'displayName': displayName,
          'address1': address1 ?? '',
          'address2': address2 ?? '',
          'city': city ?? '',
          'country': country ?? '',
          'phoneNumber': phoneNumber ?? '',
          'defaultAddress': walletAddress ?? '',
          'defaultCurrency': walletCurrency ?? '',
          isprofileUpdated: true,
        })
        alert('Account updated.')
        window.location.href = `https://my.optimoinvest.com/app`;
      } else {
        alert('Please fill all the fields.')
        setMessage('Please fill all the fields.')
      }
    } catch (error) {
      setMessage(error.message)
      // alert(error.message)
    }
  }



  useMemo(() => {
    callAxios()
  }, [])

  return (
    <div>
      {error && <div>error</div>}
      {loading && <div>Loaing</div>}
      {data && done && <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
                <h2 className="mb-2 text-lg font-bold text-blue-800 dark:text-gray-200">Optimo Investments</h2>
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Profile Setup</h1>
                <div className="my-3 px-4 text-sm text-red-900 py-2 bg-red-50 rounded" hidden={(msg) == ''}>
                  {msg}
                </div>
                <p className="mb-4 text-xs text-justify text-gray-700 dark:text-gray-200">Please Enter Your Contact Details. We will contact you </p>
                <Label className="mt-4">
                  <span>Full Name</span>
                  <Input className="mt-1" type="text" placeholder="" valid={(displayName == '') ? false : true} value={displayName} onInput={e => setDN(e.target.value)} />
                </Label>
                <Label className="mt-4">
                  <span>Address Line 1</span>
                  <Input className="mt-1" type="text" placeholder="" valid={(address1 == '') ? false : true} value={address1} onInput={e => setAddress1(e.target.value)} />
                </Label>
                <Label className="mt-4">
                  <span>Address Line 2</span>
                  <Input className="mt-1" type="text" placeholder="" valid={(address2 == '') ? false : true} value={address2} onInput={e => setAddress2(e.target.value)} />
                </Label>
                <Label className="mt-4">
                  <span>City</span>
                  <Input className="mt-1" type="text" placeholder="" valid={(city == '') ? false : true} value={city} onInput={e => setCity(e.target.value)} />
                </Label>
                <Label className="mt-4">
                  <span>Country ({country})</span>
                  <Select className="mt-1" onChange={(v) => {
                    setCode(v.target.value)
                    setCountry(countries[v.target.value][v.target.value].name)
                    setPhoneNumber(`+` + countries[v.target.value][v.target.value].code)
                  }}>
                    {(countries.map((e, i) => {
                      return <option value={i}>{e[i].name}</option>
                    }))}
                  </Select>
                </Label>
                <Label className="mt-4">
                  <span>Phone Number</span>
                  <input type="text" className="py-2 px-3 rounded border w-full" defaultValue={phoneNumber} onChange={(v) => setPhoneNumber(v.target.value)} />
                </Label>
                <p className="mt-4 text-xs text-justify text-gray-700 dark:text-gray-200">You need to specify a default wallet for your account. This wallet will be used to send your refferal bonuses etc.</p>
                <Label className="mt-4">
                  <span>Wallet Currency </span>
                  <Select className="mt-1" valid={(walletCurrency == '') ? false : true} value={walletCurrency} onChange={e => setWalletCurrency(e.target.value)}>
                    <option value="''">Select</option>
                    <option value="btc">BTC</option>
                    <option value="eth">ETHERIUM</option>
                    <option value="USDT">USDT</option>
                    <option value="usd">SKRILL</option>
                  </Select>
                </Label>
                <Label className="mt-4">
                  <span>Wallet Address</span>
                  <Input className="mt-1" type="text" placeholder="" valid={(walletAddress == '') ? false : true} value={walletAddress} onInput={e => setWalletAddress(e.target.value)} />
                </Label>

                <Button onClick={() => handleSubmit()} block className="mt-4">
                  Save and Continue to Dashboard
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ProfileSetup
