import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        subaccountId:string
        funnelId:string
        funnelPageId:string
    }
}

const page = async ({params}: Props) => {
    const funnelPageDetails = await db.funnelPage.findFirst({
        where: { id : params.funnelPageId }
    })
    if(!funnelPageDetails){
        return redirect(`/subaccount/${params.subaccountId}/funnel/${params.funnelPageId}`)
    } 
  return (
    <div>page</div>
  )
}

export default page