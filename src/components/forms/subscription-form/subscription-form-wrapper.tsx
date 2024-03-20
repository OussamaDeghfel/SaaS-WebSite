"use client";
import { toast } from "@/components/ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { Plan } from "@prisma/client";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  customerId: string
  planExists: string
};

const SubscriptionFormWrapper = ({customerId, planExists}: Props) => {
  const { data, setClose } = useModal();
  const router = useRouter();
  const [selectedPriceId, setSelectedPriceId] = useState<Plan | "">(
    data?.plans?.defaultPriceId || ""
  );
  const [subscription, setSubscription] = useState<{
    subscriptionId: string;
    clientSecret: string;
  }>({ subscriptionId: "", clientSecret: "" });

  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret: subscription?.clientSecret,
      appearance: {
        theme: "flat",
      },
    }),
    [subscription]
  );

  useEffect(()=>{
    if(!selectedPriceId) return
    const createSecret = async () => {
        const subscriptionResponse = await fetch(
            '/api/stripe/create-subscription',
            {
                method: 'POST',
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    customerId,
                    priceId: selectedPriceId
                })
            }
        )
        const subscriptionResponseData = await subscriptionResponse.json()
        setSubscription({
            clientSecret: subscriptionResponseData.clientSecret,
            subscriptionId: subscriptionResponseData.subscriptionId
        })
        if(planExists){
            toast({
                title: "Plan already exists.",
                description: "Your Plan Has been successfully upgraded!"
            })
            setClose()
            router.refresh()
        }
    }
    createSecret()
  },[data, selectedPriceId, customerId])

  return <div>SubscriptionFormWrapper</div>;
};

export default SubscriptionFormWrapper;
