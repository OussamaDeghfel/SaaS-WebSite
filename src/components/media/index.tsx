import { GetMediaFiles } from '@/lib/types'
import React from 'react'
import MediaUploadbutton from './upload-button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import MediaCard from './media-card'
import { FolderSearch } from 'lucide-react'

type Props = {
    data: GetMediaFiles
    subaccountId: string
}

const MediaComponent = ({data, subaccountId}: Props) => {
  return (
    <div className='h-full w-full flex gap-4 flex-col'>
        <div className='flex justify-between items-center'>
            <h1 className=' flex text-xl'>Media Bucket</h1>
            <MediaUploadbutton subaccountId={subaccountId} />
        </div>
        <Command className='bg-transparent'>
          <CommandInput placeholder='Search For File Name' />
          <CommandList className='pd-40 max-h-full' >
            <CommandEmpty>No Media File</CommandEmpty>
            <CommandGroup heading="Media File">
            <div className='flex flex-wrap gap-4 pt-4'>
              {data?.Media.map((file) => 
                <CommandItem 
                  key={file.id}
                  className='p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white'  
                  >
                  <MediaCard file={file}/>
                </CommandItem>
              )}
              {!data?.Media.length && (
                <div className='flex items-center justify-center flex-col w-full'>
                  <FolderSearch
                    size={200}
                    className='dark:text-muted text-slate-300'
                    />
                  <p className='text-muted-foreground'>
                    Empty! no file to show</p>
                </div>
              )}
            </div>
            </CommandGroup>
          </CommandList>
        </Command>
    </div>
  )
}

export default MediaComponent