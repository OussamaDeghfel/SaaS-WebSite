"use Client"

import { useModal } from '@/providers/modal-provider'
import React from 'react'
import { Button } from '../ui/button'

type Props = {
    subaccountId: string
}

const MediaUploadbutton = ({subaccountId}: Props) => {
    const {setOpen, isOpen, setClose} = useModal()

  return (
    <Button>Upload</Button>
  )
}

export default MediaUploadbutton