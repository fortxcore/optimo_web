import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { useAuth } from '../../../context/AuthContext'
import RoundIcon from '../../../components/RoundIcon'
import InfoCard from '../../../components/Cards/InfoCard'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../../../icons'

const ChartList = () => {
    const { user } = useAuth()
    const [invr, loading, error] = useCollection(firebase.firestore().collection(`uData/${user.uid}/invr`).orderBy('created', 'desc'), {})
    const [ref, rloading, rerror] = useCollection(firebase.firestore().collection(`uData/${user.uid}/refferral`).orderBy('id', 'desc'), {})
    var totalInvested = 0
    var percent = 0
    var income = 0
    var nActive = 0;
    var refs = 0
    if (loading) {
        return <div>Loading</div>
    } else {
        if (invr) {
            totalInvested = 0
            invr.docs.forEach(d => {
                const data = d.data()
                if (data.isActive) {
                    totalInvested += parseFloat(data.amount)

                    income += parseFloat(data.amount / 100 * parseFloat(data.interest))
                } else {
                    nActive += parseFloat(data.amount)
                }
            })
            percent = (income * 100 / totalInvested).toFixed(2)
        }
        if (ref) {
            ref.docs.forEach(d => {
                const data = d.data()
                refs += parseFloat(data.amount)
            })
        }
    }

    return (
        <>
            < div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4" >
                <DataCard icon={MoneyIcon} title="Total Invested" main={`${parseFloat(totalInvested).toFixed(2)} USD`} description="" />
                <DataCard icon={MoneyIcon} title="Bonus Income" main={`${parseFloat(income).toFixed(2)} USD`} description={`${parseFloat(percent).toFixed(2)} % Avg. Bonus Rate`} />
                <DataCard icon={MoneyIcon} title="Total" main={`${parseFloat(totalInvested + income).toFixed(2)} USD`} description={`${parseFloat(totalInvested).toFixed(2)} USD + ${income} USD`} />
                <DataCard icon={PeopleIcon} title="Refferal Income" main={`${parseFloat(refs).toFixed(2)} USD`} description='' />
            </div>
        </>
    )
}


export default ChartList


const DataCard = ({ title, main, description, icon }) => (
    <>
        <InfoCard title={title} value={main}>
            <RoundIcon
                icon={icon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
            />
        </InfoCard>
        {/* <p>{description}</p> */}
    </>)


