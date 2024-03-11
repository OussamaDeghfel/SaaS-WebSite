import { GetMediaFiles } from '@/lib/types'
import React from 'react'

type Props = {
    data: GetMediaFiles
    subaccountId: string
}

const MediaComponent = ({data, subaccountId}: Props) => {
  return (
    <div>MediaComponent</div>
  )
}

export default MediaComponent