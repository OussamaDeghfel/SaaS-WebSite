import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React from "react";

type Props = {
  element: EditorElement;
};

const TextComponent = ({ element }: Props) => {
  const { state, dispatch } = useEditor();
  return (
    <div
      draggable
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,

          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
        <span 
            contentEditable={!state.editor.liveMode}
            onBlur={(e) => {
                const spanElement = e.target as HTMLSpanElement
                dispatch({
                    type: 'UPDATE_ELEMENT',
                    payload: {
                        elementDetails: {
                            ...element,
                            content: {
                                innerText: spanElement.innerText
                            }
                        }
                    }
                })
            }}
            ></span>
    </div>
  );
};

export default TextComponent;
