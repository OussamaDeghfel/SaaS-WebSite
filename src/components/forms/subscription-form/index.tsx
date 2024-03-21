"use client"

import { Plan } from '@prisma/client'
import React from 'react'

type Props = {
  selectedPriceId: string | Plan 
}

const SubscriptionForm = ({selectedPriceId}: Props) => {
  return (
    <div>SubscriptionForm</div>
  )
}

export default SubscriptionForm