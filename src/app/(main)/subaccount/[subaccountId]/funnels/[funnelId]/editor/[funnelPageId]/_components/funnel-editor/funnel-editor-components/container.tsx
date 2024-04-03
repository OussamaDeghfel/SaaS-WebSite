'use client'
import { EditorBtns, defaultStyles } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'
import { v4 } from 'uuid'

type Props = {
    element: EditorElement
}

const Container = ({element:{id,name,styles,content,type}}: Props) => {
    const {state, dispatch} = useEditor()

    const handleOnDrop = (e: React.DragEvent, type: string) => {
      const componentType = e.dataTransfer.getData('componentType') as EditorBtns
      switch (componentType) {
        case 'text':
            dispatch({
              type: 'ADD_ELEMENT',
              payload: ({
                containerId: id,
                elementDetails: {
                  content : {innerText: 'Text Element'},
                  id: v4(),
                  name: 'Text',
                  styles: {
                    color: 'black',
                    ...defaultStyles
                  },
                  type: 'text'
                }
              })
            })
        default:
          break;
      }
    }
  return (
    <div 
      style={styles}
      className={clsx(
        'relative p-4 transition-all group', {
          'max-w-full w-full': type === 'container' || type === '2Col',
          'h-fit': type === 'container',
          'h-full': type === '2Col',
          'flex flex-col !md:flex-row': type === '2Col',
          '!border-blue-500': 
            state.editor.selectedElement.id === id && 
            !state.editor.liveMode && 
            state.editor.selectedElement.type !== '__body',
          '!border-yellow-400 !border-4': 
            state.editor.selectedElement.id === id && 
            !state.editor.liveMode && 
            state.editor.selectedElement.type === '__body',
          '!border-solid': 
            state.editor.selectedElement.id === id && !state.editor.liveMode,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode
         }
      )}
      onDrop={(e) => handleOnDrop(e, id)}
      >Container</div>
  )
}

export default Container