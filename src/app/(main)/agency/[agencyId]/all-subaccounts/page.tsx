import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
import { getAuthUserDetails } from '@/lib/queries'
import React from 'react'

type Props = {
  params: { agencyId: string }
}

const AllSubacountsPage = async ({params}: Props) => {
  const user = await getAuthUserDetails()
  if(!user) return

  return (
    <AlertDialog>
      <div className='flex flex-col'>
        <Button>Create</Button>
        <Command className='rounded-lg bg-transparent'>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  )
}

export default AllSubacountsPage