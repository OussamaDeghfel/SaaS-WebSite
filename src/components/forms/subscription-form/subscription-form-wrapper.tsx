"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { pricingCards } from "@/lib/constants";
import { useModal } from "@/providers/modal-provider";
import { Plan } from "@prisma/client";
import { StripeElementsOptions } from "@stripe/stripe-js";
import clsx from "clsx";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  customerId: string;
  planExists: boolean;
};

const SubscriptionFormWrapper = ({ customerId, planExists }: Props) => {
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

  useEffect(() => {
    if (!selectedPriceId) return;
    const createSecret = async () => {
      const subscriptionResponse = await fetch(
        "/api/stripe/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            customerId,
            priceId: selectedPriceId,
          }),
        }
      );
      const subscriptionResponseData = await subscriptionResponse.json();
      setSubscription({
        clientSecret: subscriptionResponseData.clientSecret,
        subscriptionId: subscriptionResponseData.subscriptionId,
      });
      if (planExists) {
        toast({
          title: "Plan already exists.",
          description: "Your Plan Has been successfully upgraded!",
        });
        setClose();
        router.refresh();
      }
    };
    createSecret();
  }, [data, selectedPriceId, customerId]);

  return (
    <div className="border-none transition-all">
      <div className="flex flex-col gap-4">
        {data.plans?.plans.map((price) => (
          <Card
            key={price.id}
            className={clsx("relative cursor-pointer transition-all", {
              "border-primary": selectedPriceId === price.id,
            })}
          >
            <CardHeader>
              <CardTitle>
                ${price.unit_amount ? price.unit_amount / 100 : "0"}
                <p className="text-sm text-muted-foreground">
                    {price.nickname}
                </p>
                <p className="text-sm text-muted-foreground">
                    {
                        pricingCards.find((p)=> p.priceId === price.id)?.description
                    }
                </p>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionFormWrapper;
