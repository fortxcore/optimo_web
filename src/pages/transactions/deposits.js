import React, { useState, useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import CTA from '../../components/CTA'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import firebase from 'firebase'
import moment from 'moment'

import response from '../../utils/demo/tableData'
import { useAuth } from '../../context/AuthContext'
import { useCollection } from 'react-firebase-hooks/firestore'
// make a copy of the data, for the second table
const response2 = response.concat([])
function Deposists() {

  const [startItem, setStart] = useState(1)

  const resultsPerPage = 100

  function onPageChangeTable2(p) {
  }

  const { user } = useAuth()
  const [data, loading, error] = useCollection(firebase.firestore().collection(`uData/${user.uid}/transactions`).where('type', "==", "DEPOSIT").orderBy('id', 'desc').limit(resultsPerPage), {})

  return (
    <>
      <PageTitle>Deposits</PageTitle>
      <SectionTitle>Your Deposits</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {error && <div>Error</div>}
            {loading && <div>Loading</div>}
            {data && data.docs.map((doc, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{doc.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{doc.data().description}</span>
                </TableCell>
                <TableCell>
                  <Badge type='{user.status}'>{doc.data().amount} USD</Badge>
                </TableCell>
                <TableCell>
                  <Badge type={doc.data().status}>{doc.data().status.toLowerCase()}</Badge>
                </TableCell>
                <TableCell>
                  <>
                     <span className="text-sm">{moment(new Date(doc.data().time)).format("DD-MM-YYYY")}</span><br/>
                     <span className="text-sm">{moment(new Date(doc.data().time)).format("h:mm a")}</span>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={data && data.docs.length}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Deposists
