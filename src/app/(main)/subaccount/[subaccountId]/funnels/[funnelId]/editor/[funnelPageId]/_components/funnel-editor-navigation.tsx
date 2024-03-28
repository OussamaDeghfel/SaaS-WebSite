"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { upsertFunnelPage } from "@/lib/queries";
import { DeviceTypes, useEditor } from "@/providers/editor/editor-provider";
import { FunnelPage } from "@prisma/client";
import { TabsTrigger } from "@radix-ui/react-tabs";
import clsx from "clsx";
import { ArrowLeftCircle, EyeIcon, Laptop, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FocusEventHandler, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  funnelId: string;
  funnelPageDetails: FunnelPage;
  subaccountId: string;
};

const FunnelEditorNavigation = ({
  funnelId,
  funnelPageDetails,
  subaccountId,
}: Props) => {
    const router = useRouter()
    const {state, dispatch} = useEditor()

    useEffect(()=>{
        dispatch({
            type: 'SET_FUNNELPAGE_ID',
            payload: { funnelPageId: funnelPageDetails.id }
        })
    },[funnelPageDetails])

    const handleOnBlurTitleChange:FocusEventHandler<HTMLInputElement> = async(event) => {
        if(event.target.value === funnelPageDetails.name) return 
        if(event.target.value){
            await upsertFunnelPage(
                subaccountId,
                {
                    id: funnelPageDetails.id,
                    name: event.target.value,
                    order: funnelPageDetails.order
                },
                funnelId
            )
            toast('Success', {
                description: 'Saved Funnel Page title',
              })
            router.refresh()
        } else {
            toast('Oppse!', {
                description: 'You need to have a title!',
            })

            event.target.value === funnelPageDetails.name
        }
    }

    const handlePreviewClick = () => {
        dispatch({type: 'TOGGLE_PREVIEW_MODE'})
        dispatch({type: 'TOGGLE_LIVE_MODE'})
    }

    const handleUndo = () => {
        dispatch({type: 'UNDO'})
    }
    
    const handleRedo = () => {
        dispatch({type: 'REDO'})
    }

  return (
    <TooltipProvider>
        <nav
        className={clsx(
          'border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all',
          { '!h-0 !p-0 !overflow-hidden': state.editor.previewMode }
        )}
      >
            <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
                <Link href={`/subaccount/${subaccountId}/funnels/${funnelId}`}>
                <ArrowLeftCircle />
                </Link>
                <div className="flex flex-col w-full">
                    <Input 
                        defaultValue={funnelPageDetails.name}
                        className="border-none h-5 m-0 p-0 text-lg"
                        onBlur={handleOnBlurTitleChange}
                    />
                    <span className="text-sm text-muted-foreground">
                        Path: /{funnelPageDetails.pathName}
                    </span>
                </div>
            </aside>
            <aside>
                <Tabs 
                    defaultValue="Desktop"
                    className="w-fit"
                    value={state.editor.device}
                    onValueChange={(value)=>{
                        dispatch({
                            type: 'CHANGE_DEVICE',
                            payload: {device: value as DeviceTypes}
                        })
                    }}
                >
                    <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
                        <Tooltip>
                            <TooltipTrigger>
                                <TabsTrigger
                                    value="Dektop"
                                    className="data-[state=active]:bg-muted w-10 h-10 p-2"
                                    >
                                    <Laptop />
                                </TabsTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Desktop</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip>
                                <TooltipTrigger
                                    value='tablet'
                                    className="data-[state=active]:bg-muted w-10 h-10 p-2"
                                >
                                    <Tablet />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>tablet</p>
                                </TooltipContent>
                            </Tooltip>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip>
                                <TooltipTrigger
                                    value='mobile'
                                    className="data-[state=active]:bg-muted w-10 h-10 p-2"
                                >
                                    <Smartphone />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mobile</p>
                                </TooltipContent>
                            </Tooltip>
                        </Tooltip>
                    </TabsList>
                </Tabs>
            </aside>
            <aside className="flex items-center gap-2">
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className="hover:bg-slate-800"
                    onClick={handlePreviewClick}
                    >
                    <EyeIcon />
                </Button>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    disabled={!(state.history.currentIndex > 0)}
                    className="hover:bg-slate-800"
                    onClick={handleUndo}
                    >
                    <Undo2 />
                </Button>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    disabled={!(state.history.currentIndex > 0)}
                    className="hover:bg-slate-800"
                    onClick={handleRedo}
                    >
                    <Redo2 />
                </Button>
            </aside>
        </nav>
    </TooltipProvider>
  );
};

export default FunnelEditorNavigation;
