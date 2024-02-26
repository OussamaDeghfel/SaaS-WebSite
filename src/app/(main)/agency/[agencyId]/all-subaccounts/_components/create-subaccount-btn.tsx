import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import React from 'react'

type Props = {
    user: User & {
        Agency : 
        | (
            | Agency
            | (null & {
                SubAccount: SubAccount[]
                SideBarOption: AgencySidebarOption[]
                })
          )
        | null
    }
    id: string
    className: string
}

const CreateSubaccountBtn = ({className, id, user}: Props) => {
  return (
    <div>CreateSubaccountBtn</div>
  )
}

export default CreateSubaccountBtn