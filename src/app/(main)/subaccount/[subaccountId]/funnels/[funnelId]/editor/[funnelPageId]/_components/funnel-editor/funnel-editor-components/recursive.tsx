import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'

type Props = {
    elements : EditorElement
}

const Recursive = ({elements}: Props) => {
    switch(elements.type) {
        case 'text' : return <TextComponent />
        default : return null
    }
  
}

export default Recursive