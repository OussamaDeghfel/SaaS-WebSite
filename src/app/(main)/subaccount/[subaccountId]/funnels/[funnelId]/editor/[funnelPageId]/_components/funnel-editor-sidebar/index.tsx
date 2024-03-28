'use client'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Tabs } from '@/components/ui/tabs'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'
import TabList from './tabs'

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
                showX={false}
                side='right'
                 className={clsx(
                     'mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden',
                     {hidden: state.editor.previewMode}
                 )}
                >
                    <TabList />
            </SheetContent>
            <SheetContent
                showX={false}
                side='right'
                 className={clsx(
                     'mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden',
                     {hidden: state.editor.previewMode}
                 )}
                >
                    
            </SheetContent>
        </Tabs>
    </Sheet>
  )
}

export default FunnelEditorSideBar