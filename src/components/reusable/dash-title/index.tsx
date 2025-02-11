import React from 'react'

interface TitleProps {
    className?:string,
    title:string,
    description?:string
}

export  function DashTitle({className,title,description}:TitleProps) {
  return (
    <div className={className}>
     <h1 className="font-semibold">{title}</h1>
     {description && <p className="text-sm text-gray-800">{description}</p>}
    </div>
  )
}
