import { ContactUserFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    title: string 
    subTitle: string 
    apiCall: (values: z.infer<typeof ContactUserFormSchema>) => any 
}

const ContactForm = ({title, subTitle, apiCall}: Props) => {
    const form = useForm<z.infer<typeof ContactUserFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(ContactUserFormSchema),
        defaultValues:{
            name:'',
            email: ''
        }
    })
  return (
    <div>ContactForm</div>
  )
}

export default ContactForm