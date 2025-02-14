import React from 'react'

interface ParamsProps {
    params: {
      id: string;
    };
  }

export default function SingleUser({params:{id}}:ParamsProps) {
  return (
    <div>{id}</div>
  )
}
