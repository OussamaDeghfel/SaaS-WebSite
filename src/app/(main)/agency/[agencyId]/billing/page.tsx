import { addOnProducts, pricingCards } from '@/lib/constants'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import React from 'react'

type Props = {
  params: {agencyId: string}
}

const Billing = async ({params}: Props) => {
  const addOns = await stripe.products.list({
    ids: addOnProducts.map((product) => product.id),
    expand: ['data.default_price']
  })

  const agencySubscription = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    select: {
      customerId: true,
      Subscription: true
    }
  })

  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true
  })

  const currentPlanDetails = pricingCards.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId
  )

  return (
    <div>Billing</div>
  )
}

export default Billing