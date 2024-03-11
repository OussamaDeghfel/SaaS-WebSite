import { useModal } from '@/providers/modal-provider'
import React from 'react'

type Props = {
    subaccountId: string
}

const MediaUploadbutton = ({subaccountId}: Props) => {
    const {setOpen, isOpen, setClose} = useModal()

  return (
    <div>MediaUploadbutton</div>
  )
}

export default MediaUploadbutton