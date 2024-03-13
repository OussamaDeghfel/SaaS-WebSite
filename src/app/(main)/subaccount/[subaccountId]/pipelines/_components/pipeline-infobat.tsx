"use client"
import { Pipeline } from '@prisma/client'
import React from 'react'

type Props = {
    subaccountId : string
    pipelines: Pipeline[]
    pipelineId: string
}

const PipelineInfobar = ({subaccountId, pipelineId ,pipelines}: Props) => {
    
  return (
    <div>PipelineInfobar</div>
  )
}

export default PipelineInfobar