'use client'

import { getFunnelPageDetails } from '@/lib/queries';
import { useEditor } from '@/providers/editor/editor-provider'
import React, { useEffect } from 'react'

type Props = {
    funnelPageId: string; liveMode: boolean
}

const FunnelEditor = ({funnelPageId, liveMode}: Props) => {
    const {state, dispatch} = useEditor()

    useEffect(()=>{
        if(liveMode){
            dispatch({
                type: 'TOGGLE_LIVE_MODE',
                payload: {value: true}
            })
        }
    },[liveMode])

    useEffect(()=> {
        const fetchData = async()=>{
            const response = await getFunnelPageDetails(funnelPageId)
            if(!response) return 

            console.log(response)

            dispatch({
                type: 'LOAD_DATA',
                payload: {
                    elements: response.content ? JSON.parse(response?.content) : '',
                    withLive: !!liveMode
                }
            })
        }
        fetchData()
    },[funnelPageId])

  return (
    <div>FunnelEditor</div>
  )
}

export default FunnelEditor