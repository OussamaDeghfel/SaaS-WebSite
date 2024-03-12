'use client'
import React from 'react'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useRouter } from 'next/navigation'
import { Form } from '../ui/form'
import { createMedia, saveActivityLogsNotification } from '@/lib/queries'

type Props = {
  subaccountId:string
}

const formSchema = z.object({
  link : z.string().min(1, {message: " Media file is required "}),
  name : z.string().min(1, {message: ' Name Is required '}) 
})

const UploadMediaForm = ({subaccountId}: Props) => {
  const {toast} = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      link : "",
      name : ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>){
    try {
      const response = await createMedia(subaccountId, values)
      await saveActivityLogsNotification({
        agencyId:undefined,
        description: `Upload a media file | ${response.name}`,
        subaccountId
      })

      toast({title: 'Success', description: "Uploaded Media "})
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: 'Failed',
        description: "Could not upload media"
      })
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Media Information</CardTitle>
        <CardDescription>
          Please Enter the Details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UploadMediaForm