import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
    const {customerId, priceId} = await req.json()
    if(!customerId || !priceId) 
     return new NextResponse('CustomerId or priceID is missing ', {
        status: 400,
    })
}

