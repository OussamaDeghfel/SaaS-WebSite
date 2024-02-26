'use client'

import { getSubaccountDetails } from '@/lib/queries'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    subaccountId : string
}

const DeleteButton = ({subaccountId}: Props) => {
    const router = useRouter()

  return (
    <div onClick={async() => {
        const response = await getSubaccountDetails(subaccountId)
    }}></div>
  )
}

export default DeleteButton