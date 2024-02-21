import Link from 'next/link'
import React from 'react'

type Props = {}

const Unauthorized = (props :Props) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col p-4 text-center'>
        <h1 className='text-3xl md:text-6xl'>Unauthorized Access</h1>
        <p>Please contact support or your agency owner to get access</p>
        <Link href='/' className='bg-primary mt-4 p-2'>Back to home</Link>
    </div>
  )
}

export default Unauthorized