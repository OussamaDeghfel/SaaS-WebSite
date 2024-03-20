import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
    const {customerId, priceId} = await req.json()
    if(!customerId || !priceId) 
     return new NextResponse('CustomerId or priceID is missing ', {
        status: 400,
    })
    const subscriptionExists = await db.agency.findFirst({
        where : {customerId},
        include : {Subscription: true}
    })

    try {
        if(
            subscriptionExists?.Subscription?.subscritiptionId &&
            subscriptionExists.Subscription.active
        ) {
            if(!subscriptionExists.Subscription.subscritiptionId){
                throw new Error("Could not find the subscription Id to update the subscription")
            }
        }
    } catch (error) {
        
    }
}

