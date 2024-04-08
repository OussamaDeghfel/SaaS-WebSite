import React from "react";

const Page = ({
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

  return <div>{params.agencyId}</div>;
};

export default Page;
