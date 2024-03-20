"use client"
import { PricesList } from '@/lib/types'
import React from 'react'

type Props = {
    features: string[]
    buttonCta: string
    title: string
    description: string
    amt: string
    duration: string
    highlightTitle: string
    highlightDescription: string
    customerId: string
    prices: PricesList['data']
    planExists: boolean
}

const PricingCard = (props: Props) => {
  return (
    <div>PricingCard</div>
  )
}

export default PricingCard