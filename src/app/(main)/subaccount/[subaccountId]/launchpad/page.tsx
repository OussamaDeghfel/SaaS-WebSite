import { db } from '@/lib/db'
import React from 'react'

type Props = {
  searchParams: {
    state : string
    code : string
  }
  params: {subAccountId : string}
}

const LaunchPadSubaccountPage = async ({searchParams, params}: Props) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where : {
      id : params.subAccountId
    }
  })

  return (
    <div>LaunchPadSubaccountPage</div>
  )
}

export default LaunchPadSubaccountPage