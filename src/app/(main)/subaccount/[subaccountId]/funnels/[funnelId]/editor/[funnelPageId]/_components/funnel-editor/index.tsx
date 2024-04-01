'use client'

import { Button } from '@/components/ui/button';
import { getFunnelPageDetails } from '@/lib/queries';
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx';
import { EyeOff } from 'lucide-react';
import React, { useEffect } from 'react'

type Props = {
    funnelPageId: string; liveMode?: boolean
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

    const handleClick = () => {
        dispatch({
            type: 'CHANGE_CLICKED_ELEMENT',
            payload: {}
        })
    }

    const handleUnPreview = () => {
        dispatch({type: 'TOGGLE_LIVE_MODE'})
        dispatch({type: 'TOGGLE_PREVIEW_MODE'})
    }

  return (
    <div
        className={clsx(
            'use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md',
            {
                '!pr-0 !mr-0' : state.editor.previewMode === true || state.editor.liveMode === true,
                '!w-[850px]': state.editor.device === 'Tablet',
                '!w-[420px]': state.editor.device === 'Mobile',
                'w-full': state.editor.device === 'Desktop',
            }
        )}
        onClick={handleClick}
    >
        {state.editor.previewMode && state.editor.liveMode && 
            <Button 
                variant={'ghost'}
                size={'icon'}
                className='w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]'
                onClick={handleUnPreview}
                >
                <EyeOff />
            </Button>
        }
    </div>
  )
}

export default FunnelEditor