import React from 'react'
import InfoCard from '../../components/Cards/InfoCard';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody } from '@windmill/react-ui'

const CopyRef = () => {
    const { user } = useAuth()
    const copyToClipboard = (content) => {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    return (
        <Card className="my-4 grid md:grid-cols-2 grid-cols-1">
            <CardBody>
                <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Refferal Programme</p>
                <p className="text-gray-600 dark:text-gray-400">
                    You'll receive 10% from each investment when someone signed up with your refferal link.
                </p>
            </CardBody>
            <CardBody>
                <Card>
                    <CardBody>
                        <div onClick={() => { copyToClipboard(`https://my.optimoinvest.com/invest?${user.uid}`); alert('Refferal Link Copied to Clipboard') }}>
                            <div className="text-gray-600 dark:text-white text-md font-bold">Your Refferal Link</div>
                            <div className="text-gray-600 dark:text-gray-400">Click to copy</div>
                            <div className="text-gray-600 dark:text-white text-sm  overflow-x-hidden">https://my.optimoinvest.com/invest?${user.uid}</div>
                        </div>
                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    )
}

export default CopyRef