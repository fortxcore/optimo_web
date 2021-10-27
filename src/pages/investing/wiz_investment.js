import React, { useEffect, useMemo, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'

import ImageLight from '../../assets/img/login-office.jpeg'
import ImageDark from '../../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../../icons'
import RoundIcon from '../../components/RoundIcon'
import InfoCard from '../../components/Cards/InfoCard'
import { useAuth } from '../../context/AuthContext'
import { useCollection, useDocument, useDocumentData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { cancelRequest, deleteInvestment, removeRequest } from '../../services/investing'

import moment from 'moment'

function InvestmentDetails() {
  const { user } = useAuth()
  const location = useLocation()
  const history = useHistory()
  const [i, setI] = useState('0')
  const [load, setLoading] = useState(false)

  var id = '0';
  try {
    if (location.search.split('?')[1] != null) {
      id = location.search.split('?')[1]
    }
  } catch (error) {

  }

  const defference = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    return daysDifference;
  }

  const onDelete = async () => {
    history.push('/app/investments')
    setLoading(true)
    await deleteInvestment(user, id)
  }
  const onCancel = async (data) => {
    setLoading(true)
    await cancelRequest(user, id, data)
    setLoading(false)
  }
  const onRemoveCancel = async (data) => {
    setLoading(true)
    await removeRequest(user, id, data)
    setLoading(false)
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useEffect(() => {
    if (i == '0') {
      try {
        if (location.search.split('?')[1] != null) {
          id = location.search.split('?')[1]
          setI(id)
        }
      } catch (error) {
        setI('e')
      }
    }
  })
  const [data, loading, error] = useDocument(firebase.firestore().collection(`uData/${user.uid}/invr`).doc(i), {})
  return (
    <>
      {data && <div className="flex items-center min-h-screen pt-3 md:p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-min max-w-4xl mx-auto overflow-hidden bg-gray-50 border rounded-lg shadow-xl dark:bg-gray-700">
          <main className="flex items-center justify-center p-6 ">
            <div className="w-full">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Investment Details</h1>
              <p className="mb-4 text-md font-semibold text-gray-700 dark:text-gray-200">{data.data().name}</p>
              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                <div className="col-span-2"><InfoCard title="Investment Amount" value={`${data.data().amount} USD`} /></div>
                <InfoCard title="Status" value={`${data.data().status}`} />
                <InfoCard title="Days Left" value={`${(data.data().isActive ? moment(parseInt(data.data().created)).add(data.data().duration, 'months').diff(moment(), 'days') + ' Days' : 'Not Invested')}`} />
                <InfoCard title="Interest" value={`${data.data().interest} %`} />
                <InfoCard title="Duration" value={`${data.data().duration} Months`} />
              </div>

              <div className=''>
                {
                  (!data.data().isActive)
                    ? (data.data().invoiceURL != '')
                      ? <div>
                        <div className="my-2 px-4 text-sm text-red-900 py-2 bg-red-50 rounded">
                          Click on Deposit Now to make your investment package active
                        </div>

                      </div>
                      : <div>
                        <div className="my-2 px-4 text-sm text-red-900 py-2 bg-red-50 rounded">
                          Please wait until your deposit link appear.
                        </div>
                      </div>
                    : <div></div>
                }
              </div>
              <div className="rounded-b-md 0 text-right flex">
                {((data.data().isActive === false && !data.data().isCompleted)
                  ? (data.data().invoiceURL !== '') ? <Button className="mt-2 mx-2" onClick={() => openInNewTab(data.data().invoiceURL)}>Deposit Now</Button> : <Button className="mt-2 animate-pulse" disabled >Generating your Deposit URL </Button>
                  : '')}
                <div className="w-2"></div>
                {(data.data().isActive ? "" : <Button className="mx-2 mt-2 animate-pulse bg-red-700 font-bold" layout="outline" onClick={onDelete}>Delete </Button>)}
                {(data.data().isActive
                  ? defference(Date.now(), data.data().created) >= 1
                    ? <div></div>
                    : data.data().cancelRequested == null || data.data().cancelRequested == false
                      ? <Button className="mt-2 animate-pulse bg-red-700 font-bold" layout="outline" onClick={() => onCancel(data.data())}>{load ? 'Loading' : 'Request Cancellation'}</Button>
                      : <Button className="mt-2 animate-pulse bg-red-700 font-bold" layout="outline" onClick={() => onRemoveCancel(data.data())} >Remove Cancel Request</Button> : '')}
              </div>

            </div>
          </main>
        </div>
      </div>}
    </>
  )
}

export default InvestmentDetails
