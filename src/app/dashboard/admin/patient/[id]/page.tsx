import React from 'react'

interface ParamsProps {
    params: {
      id: string;
    };
  }

export default function SingleUser({params:{id}}:ParamsProps) {
  return (
    <div className='text-gray-500'>Patient Single Data comming..</div>
  )
}
