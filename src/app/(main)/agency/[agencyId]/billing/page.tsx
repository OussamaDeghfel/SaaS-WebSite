import { addOnProducts } from '@/lib/constants'
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

  return (
    <div>Billing</div>
  )
}

export default Billing