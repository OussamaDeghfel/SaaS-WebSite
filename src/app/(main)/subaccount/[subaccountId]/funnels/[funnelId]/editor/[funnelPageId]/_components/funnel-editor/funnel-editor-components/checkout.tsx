'use client'
import SubAccountDetails from '@/components/forms/subaccount-details'
import { getFunnel, getSubaccountDetails } from '@/lib/queries'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
    element: EditorElement
}

const Checkout = (props: Props) => {
    const {dispatch, state, subaccountId, funnelId, pageDetails} = useEditor() 
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState('')
    const [livePrices, setLivePrices] = useState([])
    const [subaccountConnectAccId, setSubaccountConnectAccId] = useState('')
    const options = useMemo(() => {(clientSecret)},[clientSecret])

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

    useEffect(()=>{
        if(!funnelId){
        const fetchData = async ()=> {
            const funnelData = await getFunnel(funnelId)
            setLivePrices(JSON.parse(funnelData?.liveProducts || '[]'))
        }
        fetchData()
    
    }


    },[funnelId])

  return (
    <div>Checkout</div>
  )
}

export default Checkout