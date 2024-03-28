'use client'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Tabs } from '@/components/ui/tabs'
import { useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

type Props = {
    subaccountId: string
}

const FunnelEditorSideBar = ({subaccountId}: Props) => {
    const {state, dispatch} = useEditor()
  return (
    <Sheet
        open={true}
        modal={false}
    >
        <Tabs className='w-full' defaultValue='Settings'>
            <SheetContent
                
                >

            </SheetContent>
        </Tabs>
    </Sheet>
  )
}

export default FunnelEditorSideBar