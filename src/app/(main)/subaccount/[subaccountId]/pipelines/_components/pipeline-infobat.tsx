"use client"
import { useModal } from '@/providers/modal-provider'
import { Pipeline } from '@prisma/client'
import React from 'react'

type Props = {
    subaccountId : string
    pipelines: Pipeline[]
    pipelineId: string
}

const PipelineInfobar = ({subaccountId, pipelineId ,pipelines}: Props) => {
    const { setOpen: setOpenModal, setClose } = useModal()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(pipelineId)
  return (
    <div>PipelineInfobar</div>
  )
}

export default PipelineInfobar