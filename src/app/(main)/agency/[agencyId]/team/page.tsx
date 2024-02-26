import { db } from '@/lib/db'
import React from 'react'

type Props = {
  params: {agencyId: string}
}

const Team = async ({params}: Props) => {
  const authUser = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      }
    },
    include: {
      Agency: { include :{ SubAccount: true}},
      Permissions: {include : {SubAccount: true}}
    }
  })

  if(!authUser) return

  return (
    <div>Team</div>
  )
}

export default Team