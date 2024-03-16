'use client'
import { LaneDetail, PipelineDetailsWithLanesCardsTagsTickets } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Lane, Ticket } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    lanes: LaneDetail[]
    pipelineId: string
    subaccountId: string
    pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets
    updateLanesOrder: (lanes: Lane[]) => Promise<void>
    updateTicketsOrder: (tickets: Ticket[]) => Promise<void>
}

const PipelineView = ({
    lanes,
    pipelineDetails,
    subaccountId,
    pipelineId,
    updateLanesOrder,
    updateTicketsOrder 
}: Props ) => {
    const {setOpen} = useModal()
    const router = useRouter
    const [allLanes, setAllLanes] = useState<LaneDetail[]>([])

  return (
    <div>PipelineView</div>
  )
}

export default PipelineView