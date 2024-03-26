import { EditorBtns } from "@/lib/constants";

export type DeviceTypes = "Desktop" | "Mobile" | "tablet";

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content: EditorElement | {};
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  funnelPageId: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const InitialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: {
    content: [],
    id: "",
    name: "",
    styles: {},
    type: null,
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  funnelPageId: ""
};

const InitialHistoryState : HistoryState ={
    history: [InitialEditorState],
    currentIndex: 0,
}

const InitialState: EditorState = {
    editor: InitialEditorState,
    history: InitialHistoryState,
}
