import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import CTA from '../../components/CTA'
import InfoCard from '../../components/Cards/InfoCard'
import { Card, CardBody } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../../icons'
import RoundIcon from '../../components/RoundIcon'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import { Label, Input, Select } from '@windmill/react-ui'
import { useAuth } from '../../context/AuthContext'
import { calculateNow, investNow } from '../../services/investing'
import CopyRef from '../refferal/copy_ref'


function Packages() {
    const { user } = useAuth()
    const [data, loading, error] = useCollection(firebase.firestore().collection(`packages`).orderBy('amount', 'desc'), {})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selected, setSelected] = useState({})
    const [payment, setPayment] = useState({})
    const [step, setStep] = useState(0);
    const [saved, setSaved] = useState(null)
    const [docs, setDocs] = useState([])
    const history = useHistory()
    const steps = [
        <Details onClick={() => setStep(1)} data={selected} />,
        <Payment onClick={(payment) => {
            setPayment(payment)
            if (payment.paymentCurrency == 'usd') {
                payment['isCoin'] = false
            } else {
                payment['isCoin'] = true
            }
            saveInvestment(payment)
        }} />,
        <LoadingDepositLink onClick={() => setStep(3)} />,
        <SaveSuccess onClick={() => history.push(`/app/invest/details?${saved}`)} />,
        <Calculator onClick={(amount) => {
            setSelected(calculateNow(amount, docs))
            setStep(0)
        }} />
    ]

    async function saveInvestment(payment) {
        setStep(2)
        const saved = await investNow(user, { ...selected }, { ...payment })
        if (saved != null) {
            setSaved(saved)
            setStep(3)
        } else {
            setStep(1)
        }
    }

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setStep(0)
    }
    return (
        <>
            <PageTitle>Packages</PageTitle>
            <SectionTitle>Optimo Investment Packages</SectionTitle>

            {(<div>
                {error && <div>Error</div>}
                {loading && <div>Loading</div>}
                {data &&

                    <div>

                        <Card className="mb-8 shadow-md animate__animated animate__bounce ">
                            <CardBody>
                                <p className="text-sm text-gray-600 dark:text-gray-400 my-2">
                                    Followings are the available packages to select. Each package have a interest and a duration. You will receive your bonus amount at the end of investment period. <strong>The capital amount can be withdraw based on the package you selected.</strong> If you need to invest custom amount, you can use our Calculator.
                                </p>
                                <Button onClick={
                                    () => {
                                        setDocs(data.docs)
                                        setStep(4)
                                        openModal()
                                    }
                                }>
                                    Investment Calculator
                                </Button>
                            </CardBody>
                        </Card>
                        <div className="grid gap-6 mb-8 md:grid-cols-3">
                            {data.docs.map((doc) => (
                                <React.Fragment key={doc.id}>
                                    <Card className="hover:shadow-lg " onClick={() => { openModal(); setSelected(doc.data()) }}>
                                        <CardBody>
                                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">{doc.data().name}</p>
                                            <InfoCard title="Minimum Investment" value={`${doc.data().min_invest} USD`} />
                                            <div className="mt-4 grid gap-4 mb-4 md:grid-cols-1 xl:grid-cols-2">
                                                <InfoCard title="Interest" value={`${doc.data().interest} %`} />
                                                <InfoCard title="Duration" value={`${doc.data().duration} Months`} />
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 my-2">
                                                <strong>Enjoy your interest every Month</strong>
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                You'll receive {parseFloat(parseInt(doc.data().min_invest) / 100 * parseInt(doc.data().interest))} USD bonus at the end of {doc.data().duration} months investment period.
                                            </p>
                                        </CardBody>
                                    </Card>
                                </React.Fragment>
                            ))}
                        </div>
                        <CopyRef/>

                    </div>
                }
            </div>)}
            <div className="">
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalBody>
                        {steps[step]}
                    </ModalBody>
                </Modal>
            </div>
        </>
    )
}



function Details({ onClick, data }) {
    return <>
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Package Details</h1>
        <p className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">{data.name}</p>
        <div className="mt-4 grid gap-4 mb-4 md:grid-cols-1 xl:grid-cols-2">
            <InfoCard title="Minimum Investment" value={`${data.min_invest} USD`} />
            <InfoCard title="Bonus Income" value={`${parseFloat(parseInt(data.min_invest) / 100 * parseInt(data.interest))} USD`} />
            <InfoCard title="Interest" value={`${data.interest} %`} />
            <InfoCard title="Duration" value={`${data.duration} Months`} />
        </div>
        <p className="text-gray-600 dark:text-gray-400 my-2 text-center">
            <strong>Enjoy your interest every Month</strong>
        </p>
        <CopyRef/>
        <Button className="mt-4" block onClick={onClick}>
            Confirm and Continue
        </Button>

    </>
}

function Calculator({ onClick }) {
    const [amount, setAmount] = useState(null)
    return (
        <>
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Investment Calculator</h1>
            <Label>
                <span>Amount you wish to invest</span>
                <Input className="mt-1" type="number" placeholder="" valid={(amount == '') ? false : true} value={amount} onInput={e => setAmount(e.target.value)} />
            </Label>
            <Button className="mt-4" block onClick={() => onClick(amount)}>
                Confirm and Continue
            </Button>
        </>
    )
}

function Payment({ onClick }) {
    const { user } = useAuth()
    const [paymentData, setPayment] = useState({ 'paymentCurrency': '', 'paymentAddress': '' })
    const [msg, setMessage] = useState('');
    return <div className="overflow-y-auto">
        <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Payment Method</h1>
        <p className="mb-4 text-xs text-justify text-gray-700 dark:text-gray-200">You need to specify the Currency and a wallet address for this Investment package. Your money and bonuses of this investment package will be sent to the selected address.</p>
        <div className="my-3 px-4 text-sm text-red-900 py-2 bg-red-50 rounded" hidden={(msg) == ''}>
            {msg}
        </div>
        <Button block layout="outline" onClick={() => onClick({ 'paymentAddress': user['defaultAddress'], 'paymentCurrency': user['defaultCurrency'] })}>
            <MoneyIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            Default Payment Method
        </Button>
        <div className="p-2 mt-1 rounded-lg bg-blue-100 text-blue-900 overflow-y-auto text-sm"><p>{user['defaultCurrency']} address : {user['defaultAddress']}</p></div>
        <hr className="my-8" />
        <p className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">or Add New Payment Method</p>
        <Label className="mt-4">
            <span>Wallet Currency </span>
            <Select className="mt-1" onChange={v => setPayment({ paymentCurrency: v.target.value, paymentAddress: paymentData.paymentAddress })}>
                <option value="''">Select</option>
                <option value="btc">BTC</option>
                <option value="eth">ETHERIUM</option>
                <option value="USDT">USDT</option>
                <option value="usd">SKRILL</option>
            </Select>
        </Label>
        <Label className="mt-4">
            <span>Wallet Address / Skrill Email Address</span>
            <Input className="mt-1" type="text" placeholder="Wallet/Email Address" onInput={(v) => setPayment({ paymentAddress: v.target.value, paymentCurrency: paymentData.paymentCurrency })} />
        </Label>

        <Button className="mt-4" block onClick={() => {
            if (paymentData.paymentAddress == '' || paymentData.paymentCurrency == '') {
                setMessage('Please check all the fields.')
            } else {
                onClick(paymentData)
            }
        }}>
            Save and Continue
        </Button>
    </div>
}

function LoadingDepositLink({ onClick }) {
    return <>
        <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">We're setting things up for you</h1>
        <p>Please wait</p>
    </>
}
function SaveSuccess({ onClick }) {
    return <>
        <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Your investment package successfully created.</h1>
        <h4>* Important</h4>
        <p>Now you'll be redirected to your package information screen. You need to deposit money for your package in order to make your package active.</p>
        <p>Once you deposit money, you can not delete your package. You can request for cancellation within 24h of deposit.</p>
        <Button className="mt-4" block onClick={onClick}>
            Continue
        </Button>
    </>
}
export default Packages
