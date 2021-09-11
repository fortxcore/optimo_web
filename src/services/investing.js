import firebase from "firebase"

const investNow = async (user, data, paymentInfo) => {
    const ts = `${Date.now()}`
    const description = `${data.min_invest} USD Investment ${data.duration} Months / ${data.interest}% Interest.`
    var saveData = {
        id: ts,
        uid: user.uid,
        created: ts,
        amount: data.min_invest,
        status: 'DRAFT',
        isActive: false,
        invoiceURL: "",
        name: `Optimo Investments ${data.min_invest} Package`,
        description: description,
        paymentInfo: { ...paymentInfo },
        ...data,
    }
    const localStorage = window.localStorage;
    if (localStorage.getItem('ref') != null) {
        saveData['ref_id'] = localStorage.getItem('ref')
    }

    const promt = prompt("Type your email to confirm")
    if (promt === user.email) {
        await firebase.firestore().collection(`uData/${user.uid}/invr`).doc(ts).set(saveData)
        return ts
    } else {
        alert('Wrong email Provided.')
        return null
    }
}

const calculateNow = (amount, data) => {
    var m = {}
    var last = data[data.length - 1]
    if(parseFloat(amount)<last.data()['amount']){
        return last.data()
    }

    data.every(p => {
        const pack = p.data()
        if (pack.amount <= parseFloat(amount)) {
            m = pack
            return false
        }
        return true
    })
    m['min_invest'] = amount
    m['amount'] = amount
    return m
}


const deleteInvestment = async (user, id) => {
    const promt = prompt("Are you sure you want to delete?.\n Type your email to confirm")
    if (promt === user.email) {
        await firebase.firestore().collection(`uData/${user.uid}/invr`).doc(id).delete().then(() => {
            alert('Deleted.')
        }).catch((e) => {
            alert('An error occured while deleting.')
        })
        await firebase.firestore().collection(`aData/public/invr`).doc(id).delete()
        return true
    } else {
        alert('Wrong email provided or cancelled.')
        return false
    }
}
const cancelRequest = async (user, id, data) => {
    const promt = prompt("Are you sure you want to request cancellation?.\n Type your email to confirm")
    if (promt === user.email) {
        await firebase.firestore().collection(`uData/${user.uid}/deleter`).doc(id).set({ ...data, 'id': id }).then(() => {
            alert('Request Sent. We will contact you soon.')
        }).catch((e) => {
            alert('An error occured while requesting.')
        })
        await firebase.firestore().collection(`uData/${user.uid}/invr`).doc(id).update({ 'cancelRequested': true })
        return true
    } else {
        alert('Wrong email provided or cancelled.')
        return false
    }
}

const removeRequest = async (user, id, data) => {
    const promt = prompt("Are you sure you want to remove cancel request?.\n Type your email to confirm")
    if (promt === user.email) {
        await firebase.firestore().collection(`uData/${user.uid}/deleter`).doc(id).delete().then(() => {
            alert('Request Cancelled. Your investment is active again!.')
        }).catch((e) => {
            alert('An error occured.')
        })
        await firebase.firestore().collection(`uData/${user.uid}/invr`).doc(id).update({ 'cancelRequested': false })
        return true
    } else {
        alert('Wrong email provided or cancelled.')
        return false
    }
}
export { investNow, removeRequest, cancelRequest, deleteInvestment,calculateNow}