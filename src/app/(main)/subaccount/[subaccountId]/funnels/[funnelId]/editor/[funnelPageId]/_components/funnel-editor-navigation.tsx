"use client";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { upsertFunnelPage } from "@/lib/queries";
import { useEditor } from "@/providers/editor/editor-provider";
import { FunnelPage } from "@prisma/client";
import clsx from "clsx";
import { ArrowLeftCircle } from "lucide-react";
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
        </nav>
    </TooltipProvider>
  );
};

export default FunnelEditorNavigation;
