'use client'
import { Button } from '@/components/ui/button'
import { LaneDetail, PipelineDetailsWithLanesCardsTagsTickets } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Lane, Ticket } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {DragDropContext , DropResult, Droppable} from "react-beautiful-dnd"

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

    useEffect(() => {
        setAllLanes(lanes)
    }, [lanes])

  return (
    <DragDropContext onDragEnd={() => {}}>
        <div className='bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>{pipelineDetails?.name}</h1>
                <Button
                    className='flex items-center gap-4'
                    onClick={handleAddlane}
                >
                    <Plus size={15} />
                    Create Lane
                </Button>
            </div>
        </div>
    </DragDropContext>
  )
}

export default PipelineView