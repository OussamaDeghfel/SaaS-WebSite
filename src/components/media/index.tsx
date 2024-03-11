import { GetMediaFiles } from '@/lib/types'
import React from 'react'

type Props = {
    data: GetMediaFiles
    subaccountId: string
}

const MediaComponent = ({data, subaccountId}: Props) => {
  return (
    <div className='h-full w-full flex gap-4 flex-col'>
        <div className='flex justify-center items-center'>
            <h1 className='text-4xl'>Media Bucket</h1>
            <MediaUploadButton subaccountId={subaccountId} />
        </div>
    </div>
  )
}

export default MediaComponent