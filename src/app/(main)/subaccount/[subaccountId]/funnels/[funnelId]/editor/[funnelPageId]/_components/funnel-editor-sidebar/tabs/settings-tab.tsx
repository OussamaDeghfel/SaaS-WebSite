"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import React from "react";

type Props = {};

const SettingsTab = (props: Props) => {
  const { state, dispatch } = useEditor();

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleOnChange = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;

    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["typography", "Dimensions", "Decoration", "FlexBox"]}
    >
      <AccordionItem value="custom" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === "link" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https:domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <Input
              id="color"
              onChange={handleOnChange}
              value={state.editor.selectedElement.styles.color}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
                <small className="p-2">
                    {typeof state.editor.selectedElement.styles?.opacity === "number"
                        ? state.editor.selectedElement.styles?.opacity 
                        : parseFloat(
                            (
                                state.editor.selectedElement.styles?.opacity || '0'
                            ).replace('%', '')
                        ) || '0'
                    }
                    %
                </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChange({
                  target: {
                    id: 'opacity',
                    value: `${e[0]}%`,
                  },
                })
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.opacity === 'number'
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || '0'
                      ).replace('%', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div 
                className="w-12"
                style={{
                  backgroundImage: state.editor.selectedElement.styles.backgroundImage
                }}
                />
              <Input
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                placeholder="url()"
                onChange={handleOnChange}
                value={state.editor.selectedElement.styles.backgroundImage}
                />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsTab;
