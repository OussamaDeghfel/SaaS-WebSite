import { Tabs } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { getLanesWithTicketAndTags, getPipelineDetails } from '@/lib/queries';
import { LaneDetail } from '@/lib/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {subaccountId: string; pipelineId: string }
}

const PipelinePage = async({params}: Props) => {
    const pipelineDetails = await getPipelineDetails(params.pipelineId)

    if(!pipelineDetails)
        return redirect(`/subaccount/${params.subaccountId}/pipelines`)

    const pipelins = await db.pipeline.findMany({
        where: {subAccountId: params.subaccountId}
    })    

    const lanes = (await getLanesWithTicketAndTags(params.pipelineId)) as LaneDetail[]

  return (
    <Tabs 
        defaultValue='view'
        className='w-full'
    ></Tabs>
  )
}

export default PipelinePage