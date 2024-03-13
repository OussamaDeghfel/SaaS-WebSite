import { GetMediaFiles } from '@/lib/types'
import React from 'react'
import MediaUploadbutton from './upload-button'
import { Command, CommandEmpty, CommandInput, CommandList } from '../ui/command'

type Props = {
    data: GetMediaFiles
    subaccountId: string
}

const MediaComponent = ({data, subaccountId}: Props) => {
  return (
    <div className='h-full w-full flex gap-4 flex-col'>
        <div className='flex justify-between items-center'>
            <h1 className='text-4xl'>Media Bucket</h1>
            <MediaUploadbutton subaccountId={subaccountId} />
        </div>
        <Command className='bg-transparent'>
          <CommandInput placeholder='Search For File Name' />
          <CommandList className='pd-40 max-h-full' >
          <CommandEmpty >NO Media File</CommandEmpty>
          </CommandList>
        </Command>
    </div>
  )
}

export default MediaComponent