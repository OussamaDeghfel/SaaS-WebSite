"use client"

import { useToast } from '@/components/ui/use-toast'
import { Plan } from '@prisma/client'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

type Props = {
  selectedPriceId: string | Plan 
}

const SubscriptionForm = ({selectedPriceId}: Props) => {
  const toast = useToast()
  const element = useElements()
  const stripeHook = useStripe()
  return (
    <div>SubscriptionForm</div>
  )
}

export default SubscriptionForm