'use client'
import { TicketWithTags } from '@/lib/types'
import React from 'react'

type Props = {
  laneId: string
  subaccountId: string
  getNewTicket: (ticket: TicketWithTags[0]) => void
}

const TicketForm = (props: Props) => {
  return (
    <div>TicketForm</div>
  )
}

export default TicketForm