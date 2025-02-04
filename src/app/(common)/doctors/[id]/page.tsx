import Link from 'next/link'
import React from 'react'

export default function Doctor() {
  return (
    <div>
         <div className='text-center py-12'>
      <h1 className='text-xl lg:text-3xl font-bold'>Doctor Profile</h1>
      <h2 className='text-sm'><Link href={"/doctors"}>Doctors</Link> / Doctor Profile</h2>
      </div>
    </div>
  )
}
