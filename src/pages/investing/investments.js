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
import { useHistory } from 'react-router-dom'
// make a copy of the data, for the second table
const response2 = response.concat([])
function Investments() {
  const history = useHistory()
  function onPageChangeTable2(p) {
  }

  const resultsPerPage = 100;

  const { user } = useAuth()
  const [data, loading, error] = useCollection(firebase.firestore().collection(`uData/${user.uid}/invr`).orderBy('status', 'desc'), {})

  return (
    <>
      <PageTitle>Investments</PageTitle>
      <SectionTitle>Your Investments</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Days Left</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {error && <div>Error</div>}
            {loading && <div>Loading</div>}
            {data && data.docs.map((doc, i) => (
              <TableRow key={i} onClick={() => history.push(`/app/invest/details?${doc.id}`)}>
                <TableCell>
                  <span className="text-sm">{doc.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{doc.data().amount} USD</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{doc.data().duration} Months</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{doc.data().interest} %</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{moment(parseInt(doc.data().created)).add(doc.data().duration, 'months').diff(moment(), 'days')} Days</span><br />
                  <span className="text-sm">(~{moment(parseInt(doc.data().created)).add(doc.data().duration, 'months').diff(moment(), 'months')} Months)</span>
                </TableCell>
                <TableCell>
                  <Badge type={doc.data().status.toLowerCase()} >{doc.data().status}</Badge>
                </TableCell>
                <TableCell>
                  <>
                    <span className="text-sm">{moment(new Date(parseInt(doc.data().created))).format("DD-MM-YYYY")}</span><br />
                    <span className="text-sm">{moment(new Date(parseInt(doc.data().created))).format("h:mm a")}</span>
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

export default Investments
