import { GetMediaFiles } from '@/lib/types'
import React from 'react'
import MediaUploadbutton from './upload-button'
import { Command, CommandEmpty, CommandInput } from '../ui/command'

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
        <Command>
          <CommandInput placeholder='Search For File Name' />
          <CommandEmpty>NO Media File</CommandEmpty>
        </Command>
    </div>
  )
}

export default MediaComponent