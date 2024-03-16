'use client'
import { LaneDetail, PipelineDetailsWithLanesCardsTagsTickets } from '@/lib/types'
import { Lane, Ticket } from '@prisma/client'
import React from 'react'

type Props = {
    lanes: LaneDetail[]
    pipelineId: string
    subaccountId: string
    pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets
    updateLanesOrder: (lanes: Lane[]) => Promise<void>
    updateTicketsOrder: (tickets: Ticket[]) => Promise<void>
}

const PipelineView = (props: Props) => {
  return (
    <div>PipelineView</div>
  )
}

export default PipelineView