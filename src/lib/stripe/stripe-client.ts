import {loadStripe, Stripe} from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
export const getStripe =  (connectedAccountId?: string) => {
    if(!stripePromise){
        stripePromise = loadStripe(
            process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '', 
            {stripeAccount: connectedAccountId}
        )
    }

    return stripePromise
}