'use client'
import SubAccountDetails from '@/components/forms/subaccount-details'
import { getSubaccountDetails } from '@/lib/queries'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
    element: EditorElement
}

const Checkout = (props: Props) => {
    const {dispatch, state, subaccountId, funnelId, pageDetails} = useEditor() 
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState('')
    const [livePrices, setLivePrices] = useState([])
    const [subaccountConnectAccId, setSubaccountConnectAccId] = useState('')

    useEffect(()=>{
        if(!subaccountId) return

        const fetchData = async()=> {
            const subaccountDetails = await getSubaccountDetails(subaccountId)
            if(subaccountDetails){
                if(!subaccountDetails.connectAccountId) return
                setSubaccountConnectAccId(subaccountDetails.connectAccountId)
            }
        }

        fetchData()

    },[subaccountId])

  return (
    <div>Checkout</div>
  )
}

export default Checkout