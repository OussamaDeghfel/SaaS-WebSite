'use client'
import { getSubAccountTeamMembers, searchContacts } from '@/lib/queries'
import { TicketFormSchema, TicketWithTags } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Contact, Tag, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { setTimeout } from 'timers'
import { z } from 'zod'

type Props = {
  laneId: string
  subaccountId: string
  getNewTicket: (ticket: TicketWithTags[0]) => void
}

const TicketForm = ({getNewTicket, subaccountId, laneId}: Props) => {
  const {data: defaultData, setClose} = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof TicketFormSchema>>()
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

  useEffect(()=> {
    if(defaultData.ticket){
      form.reset({
        name: defaultData.ticket.name || '',
        description: defaultData.ticket?.description || '',
        value: String(defaultData.ticket?.value || 0)
      })
      if(defaultData.ticket.customerId)
        setContact(defaultData.ticket.customerId)
    
      const fetchData = async () => {
        const response = await searchContacts(
          //@ts-ignore
          defaultData.ticket?.Customer?.name
        )
        setContactList(response)
      }  
      fetchData()
    }
  },[defaultData])

  return (
    <div>TicketForm</div>
  )
}

export default TicketForm