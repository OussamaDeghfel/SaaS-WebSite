'use client'
import { getSubAccountTeamMembers } from '@/lib/queries'
import { TicketWithTags } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Contact, Tag, User } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
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
  const saveTimeRef = useRef<ReturnType<typeof setTimeout>>()
  const [allTeamMembers, setAllTeamMembers] = useState<User[]>([])
  const [assignedTo, setAssignedTo] = useState(
    defaultData.ticket?.Assigned?.id || ''
  )

    useEffect(()=> {
      if(subaccountId){
        const fetchData = async () => {
          const response = await getSubAccountTeamMembers(subaccountId)
          console.log(response)
          if(response) setAllTeamMembers(response)
        }
      fetchData()
      }
    },[subaccountId])

  return (
    <div>TicketForm</div>
  )
}

export default TicketForm