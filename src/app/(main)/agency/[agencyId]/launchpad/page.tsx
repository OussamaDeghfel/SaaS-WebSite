import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'
import Image from 'next/image'
import React from 'react'

type Props = {
  params: {
    agencyId: string;
  }
  searchParams: {
    code : string
  }
}

const LaunchPadPage = async ({params, searchParams}: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: {id: params.agencyId},
  })

  if(!agencyDetails) return 

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full h-full max-w-[800px]'>
        <Card className='border-none'>
          <CardHeader>
            <CardTitle>Lets Get Started</CardTitle>
            <CardDescription>Follow the steps bellow to get your account setup</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className='flex justify-between items-center w-full border p-4 rounded-lg gap-2'>
              <div className='flex gap-4 flex-col md:items-center md:!flex-row'>
                <Image 
                  src='/appstore.png'
                  alt='app logo'
                  height={80}
                  width={80}
                  className='rounded-md object-contain'
                />
                <p>save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
            <div className='flex justify-between items-center w-full border p-4 rounded-lg gap-2'>
              <div className='flex gap-4 flex-col md:items-center md:!flex-row'>
                <Image 
                  src='/stripelogo.png'
                  alt='app logo'
                  height={80}
                  width={80}
                  className='rounded-md object-contain'
                />
                <p>Connect your stripe account to accept payments and see your
                  dashboard.</p>
              </div>
              <Button>Start</Button>
            </div>
            <div className='flex justify-between items-center w-full border p-4 rounded-lg gap-2'>
              <div className='flex gap-4 flex-col md:items-center md:!flex-row'>
                <Image 
                  src='/appstore.png'
                  alt='app logo'
                  height={80}
                  width={80}
                  className='rounded-md object-contain'
                />
                <p>save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LaunchPadPage