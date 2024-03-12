'use client'
import React from 'react'
import { z } from 'zod'

type Props = {
  subaccountId:string
}

const formSchema = z.object({
  link : z.string().min(1, {message: " Media file is required "}),
  name : z.string().min(1, {message: ' Name Is required '}) 
})

const UploadMediaForm = ({subaccountId}: Props) => {
  return (
    <div>UploadMediaForm</div>
  )
}

export default UploadMediaForm