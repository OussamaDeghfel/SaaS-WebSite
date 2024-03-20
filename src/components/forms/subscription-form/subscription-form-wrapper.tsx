"use client"
import { useModal } from '@/providers/modal-provider'
import { Plan } from '@prisma/client'
import { StripeElementsOptions } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

type Props = {
    customerId: string
    planExists: string
}

const SubscriptionFormWrapper = (props: Props) => {
    const {data, setClose} = useModal()
    const router = useRouter()
    const [selectedPriceId, setSelectedPriceId] = useState<Plan | ''>(
        data?.plans?.defaultPriceId || ''
    )
    const [subscription, setSubscription] = useState<{
        subscriptionId: string
        clientSecret: string
      }>({ subscriptionId: '', clientSecret: '' })

    
      const options: StripeElementsOptions = useMemo(
        () => ({
            clientSecret: subscription?.clientSecret,
            appearance: {
              theme: 'flat',
            },
          }),
        [subscription]
      )
  return (
    <div>SubscriptionFormWrapper</div>
  )
}

export default SubscriptionFormWrapper