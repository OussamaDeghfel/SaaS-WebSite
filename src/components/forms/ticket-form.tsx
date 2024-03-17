'use client'
import { TicketWithTags } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Contact, Tag } from '@prisma/client'
import React, { useRef, useState } from 'react'
import { setTimeout } from 'timers'

type Props = {
  laneId: string
  subaccountId: string
  getNewTicket: (ticket: TicketWithTags[0]) => void
}

const TicketForm = ({getNewTicket, subaccountId, laneId}: Props) => {
  const {data: defaultData} = useModal()
  const [tags, setTags] = useState<Tag[]>()
  const [contact, setContact] = useState("")
  const [search, setSearch] = useState("")
  const [contactList, setContactList] = useState<Contact[]>([])
  const [assignedTo, setAssignedTo] = useState(
    defaultData.ticket?.Assigned?.id || ''
  )
  const saveTimeRef = useRef<ReturnType<typeof setTimeout>>()

  return (
    <div>TicketForm</div>
  )
}

export default TicketForm