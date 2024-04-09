'use client'
import { getPipelines } from '@/lib/queries'
import { Prisma } from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
    subaccountId: string
}

const PipelineValue = ({subaccountId}: Props) => {
    const [pipelines, setPipelines] = useState<Prisma.PromiseReturnType<typeof getPipelines>>([])
    const [selectedPipelineId, setSelectedPipelineId] = useState('')
    const [pipelineClosedValue, setPipelineClosedValue] = useState(0)

    useEffect(()=>{
        const fetchData = async () => {
            const res = await getPipelines(subaccountId)
            setPipelines(res)
            setSelectedPipelineId(res[0]?.id)
        }
        fetchData()
    },[subaccountId])

    const totalPipelineValue = useMemo(() => {
        if(pipelines.length){
            return (
                pipelines.find((pipeline) => pipeline.id === selectedPipelineId)
                ?.Lane?.reduce((totalLanes, lane, currentLaneIndex, array) => {
                    const laneTicketsTotal = lane.Tickets.reduce(
                        (totalTickets, ticket) => totalTickets + Number(ticket?.value),0
                    )
                    if(currentLaneIndex === array.length-1) {
                        setPipelineClosedValue(laneTicketsTotal || 0)
                        return totalLanes
                    }
                    return totalLanes + laneTicketsTotal
                },0)
            )
        }
    },[selectedPipelineId, pipelines])

  return (
    <div>PipelineValue</div>
  )
}

export default PipelineValue