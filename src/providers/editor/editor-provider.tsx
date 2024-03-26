import { EditorBtns } from "@/lib/constants"

export type DeviceTypes = "Device" | "Mobile" | "tablet"

export type EditorElement = {
    id: string 
    styles: React.CSSProperties
    name: string 
    type: EditorBtns
    content: EditorElement | {}
}

export type Editor = { 
    liveMode: boolean
    elements: EditorElement[]
    selectedElement: EditorElement
    device: DeviceTypes
    previewMode: boolean
    funnelPageId: string
}

export type HistoryState = {
    history: Editor[]
    currentIndex: string
}

export type EditorState = {
    editor: Editor
    history: HistoryState
}