import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ClipboardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async ({
  params,
}: {
  params: { agencyId: string };
  searchParams: { code: string };
}) => {

  let currency = 'USD'
  let sessions
  let totalClosedSessions
  let totalPendingSessions
  let net = 0
  let potentialIncome = 0
  let closingRate = 0 
  const currentYear = new Date().getFullYear()
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000

  const agencyDetails = await db.agency.findUnique({
    where: {id: params.agencyId}
  })

  if(!agencyDetails) return 

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId: params.agencyId
    }
  })

  if(agencyDetails.connectAccountId){
    const response = await stripe.accounts.retrieve({
      stripeAccount: agencyDetails.connectAccountId
    })

    currency = response.default_currency?.toUpperCase() || 'USD'
    const checkoutSessions = await stripe.checkout.sessions.list(
      {
        created: {gte: startDate, lte:endDate},
        limit: 100
      },
      {
        stripeAccount: agencyDetails.connectAccountId
      }
      )
      sessions = checkoutSessions.data
      totalClosedSessions = checkoutSessions.data
      .filter((session) => session.status === 'complete')
      .map((session) => ({
        ...session,
        created: new Date(session.created).toLocaleDateString(),
        amount_total: session.amount_total ? session.amount_total / 100 : 0
      }))
      totalPendingSessions = checkoutSessions.data
      .filter((session) => session.status === 'open')
      .map((session) => ({
        ...session,
        created: new Date(session.created).toLocaleDateString(),
        amount_total: session.amount_total ? session.amount_total / 100 : 0
      }))
      net = +totalClosedSessions
        .reduce((total, session) => total + (session.amount_total || 0), 0)
        .toFixed(2)

      potentialIncome = +totalPendingSessions
        .reduce((total, session) => total + (session.amount_total || 0), 0)
        .toFixed(2)

      closingRate = +(
        (totalClosedSessions.length / checkoutSessions.data.length) * 100
      ).toFixed(2)
  }

  return <div className="relative h-full">
     {!agencyDetails.connectAccountId && (
        <div className="absolute -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Stripe</CardTitle>
              <CardDescription>
                You need to connect your stripe account to see metrics
              </CardDescription>
              <Link
                href={`/agency/${agencyDetails.id}/launchpad`}
                className="p-2 w-fit bg-secondary text-white rounded-md flex items-center gap-2"
              >
                <ClipboardIcon />
                Launch Pad
              </Link>
            </CardHeader>
          </Card>
        </div>
      )}
      <h1 className="text-4xl">Dashboard</h1>
      <Separator className="my-6" />
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4 flex-col xl:!flex-row">
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Income</CardDescription>
              <CardTitle className="text-4xl">
                {net ? `${currency} ${net.toFixed(2)}` : `$0.00`}
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For The Year {currentYear}
              </small>
            </CardHeader>
          </Card>
        </div>
      </div>
  </div>;
};

export default Page;
