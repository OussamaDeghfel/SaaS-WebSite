'use client'

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

  return (
    <div>FunnelEditor</div>
  )
}

export default FunnelEditor