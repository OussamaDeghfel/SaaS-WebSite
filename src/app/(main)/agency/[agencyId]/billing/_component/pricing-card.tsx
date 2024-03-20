"use client";
import { PricesList } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  features: string[];
  buttonCta: string;
  title: string;
  description: string;
  amt: string;
  duration: string;
  highlightTitle: string;
  highlightDescription: string;
  customerId: string;
  prices: PricesList["data"];
  planExists: boolean;
};

const PricingCard = ({
  amt,
  buttonCta,
  customerId,
  description,
  duration,
  features,
  highlightDescription,
  highlightTitle,
  planExists,
  prices,
  title,
}: Props) => {
    const {setOpen} = useModal()
    const searchParams = useSearchParams()
    const plan = searchParams.get('plan')
    
  return <div>PricingCard</div>;
};

export default PricingCard;
