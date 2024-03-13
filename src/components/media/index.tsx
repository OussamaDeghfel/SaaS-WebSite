import { GetMediaFiles } from '@/lib/types'
import React from 'react'
import MediaUploadbutton from './upload-button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '../ui/command'
import MediaCard from './media-card'

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
            <CommandEmpty>No Media File</CommandEmpty>
            <div className='flex flex-wrap gap-4 pt-4'>
              {data?.Media.map((file) => 
                <CommandItem 
                  key={file.id}
                  className='p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white'  
                  >
                  <MediaCard file={file}/>
                </CommandItem>
              )}
            </div>
          </CommandList>
        </Command>
    </div>
  )
}

export default MediaComponent