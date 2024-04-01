'use client'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

type Props = {
    element: EditorElement
}

const Container = ({element:{id,name,styles,content,type}}: Props) => {
    const {state, dispatch} = useEditor()
  return (
    <div>Container</div>
  )
}

export default Container