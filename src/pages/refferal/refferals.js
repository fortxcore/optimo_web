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
import CopyRef from './copy_ref'
// make a copy of the data, for the second table
const response2 = response.concat([])
function Refferals() {

  const [startItem, setStart] = useState(1)

  const resultsPerPage = 100

  function onPageChangeTable2(p) {
  }

  const { user } = useAuth()
  const [data, loading, error] = useCollection(firebase.firestore().collection(`uData/${user.uid}/refferral`).orderBy('id', 'desc').limit(resultsPerPage), {})

  return (
    <>
      <PageTitle>Refferals</PageTitle>
      <SectionTitle>Your Refferals</SectionTitle>

      <CopyRef />

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>From</TableCell>
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
                  <span className="text-sm">{doc.data().amount} USD</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{doc.data().from}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{doc.data().status}</span>
                </TableCell>
                <TableCell>
                  <>
                    <span className="text-sm">{moment(new Date(doc.data().created)).format("DD-MM-YYYY")}</span><br />
                    <span className="text-sm">{moment(new Date(doc.data().created)).format("h:mm a")}</span>
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

export default Refferals
