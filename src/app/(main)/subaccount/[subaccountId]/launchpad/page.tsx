import React from 'react'

type Props = {
  searchParams: {
    state : string
    code : string
  }
  params: {subAccountId : string}
}

const LaunchPadSubaccountPage = ({searchParams, params}: Props) => {
  return (
    <div>LaunchPadSubaccountPage</div>
  )
}

export default LaunchPadSubaccountPage