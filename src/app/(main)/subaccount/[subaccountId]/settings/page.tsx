import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
  params: {subaccountId: string}
}

const SubaccountSettingpage = async ({params}: Props) => {
  const authUser = await currentUser()
  if(!authUser) return 
  
  return (
    <div>SubaccountSettingpage</div>
  )
}

export default SubaccountSettingpage