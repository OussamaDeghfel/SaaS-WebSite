"use Client"

import { useModal } from '@/providers/modal-provider'
import React from 'react'
import { Button } from '../ui/button'
import CustomModal from '../global/custom-modal'
import UploadMediaForm from '../forms/upload-form'

type Props = {
    subaccountId: string
}

const MediaUploadbutton = ({subaccountId}: Props) => {
    const { isOpen, setOpen, setClose} = useModal()

  return (
    <Button 
        onClick={() => {
            setOpen(
                <CustomModal 
                title='Upload Media'
                subheading='Upload a file to your Media bucket'>
                    <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
                </CustomModal>
            )
    }}>Upload</Button>
  )
}

export default MediaUploadbutton