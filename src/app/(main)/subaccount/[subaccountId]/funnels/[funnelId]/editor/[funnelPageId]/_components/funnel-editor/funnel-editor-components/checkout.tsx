"use client";
import SubAccountDetails from "@/components/forms/subaccount-details";
import { toast } from "@/components/ui/use-toast";
import { EditorBtns } from "@/lib/constants";
import { getFunnel, getSubaccountDetails } from "@/lib/queries";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  element: EditorElement;
};

const Checkout = (props: Props) => {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [livePrices, setLivePrices] = useState([]);
  const [subaccountConnectAccId, setSubaccountConnectAccId] = useState("");
  const styles = props.element.styles
  const options = useMemo(() => {
    clientSecret;
  }, [clientSecret]);

  useEffect(() => {
    if (!subaccountId) return;

    const fetchData = async () => {
      const subaccountDetails = await getSubaccountDetails(subaccountId);
      if (subaccountDetails) {
        if (!subaccountDetails.connectAccountId) return;
        setSubaccountConnectAccId(subaccountDetails.connectAccountId);
      }
    };

    fetchData();
  }, [subaccountId]);

  useEffect(() => {
    if (!funnelId) {
      const fetchData = async () => {
        const funnelData = await getFunnel(funnelId);
        setLivePrices(JSON.parse(funnelData?.liveProducts || "[]"));
      };
      fetchData();
    }
  }, [funnelId]);

  useEffect(() => {
    if (livePrices.length && subaccountId && subaccountConnectAccId) {
      const getClientSecret = async () => {
        try {
            const body = JSON.stringify({
                subaccountConnectAccId,
                prices: livePrices,
                subaccountId
            })
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}api/stripe/create-checkout-session`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body
                }
            )
            const responseJson = await  response.json()
            if(!responseJson) throw new Error('something went wrong ')
            if(responseJson.error){
                throw new Error(responseJson.error)
            }
            if(responseJson.clientSecret){
                setClientSecret(responseJson.clientSecret)
            }
        } catch (error) {
            toast({
                open: true,
                className: 'z-[100000]',
                variant: "destructive",
                title: "Oppse!",
                //@ts-ignore
                description: error.message,
            })
        }
      };

      getClientSecret()
    }
  }, [livePrices, subaccountId, subaccountConnectAccId]);

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if(type === null ) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
        type: 'CHANGE_CLICKED_ELEMENT',
        payload: {
            elementDetails: props.element
        }
    })
  }

  const goToNextPage = async() =>{
    if(!state.editor.liveMode) return
    const funnelPages = await getFunnel(funnelId)
    if(!funnelPages || !pageDetails) return

    if(funnelPages.FunnelPages.length > pageDetails.order + 1) {
        console.log(funnelPages.FunnelPages.length, pageDetails.order + 1)
        const nextPage = funnelPages.FunnelPages.find(
            (page) => page.order === pageDetails.order + 1
        )
        if(!nextPage) return
        router.replace(
            `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`
          )
    }
  }

  return <div>Checkout</div>;
};

export default Checkout;
