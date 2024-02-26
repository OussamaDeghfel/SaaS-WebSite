import { useModal } from '@/providers/modal-provider'
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
    const {setOpen} = useModal()
    const agencyDetails = user.Agency

    if(!agencyDetails) return
  return (
    <div>CreateSubaccountBtn</div>
  )
}

export default CreateSubaccountBtn