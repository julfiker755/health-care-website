import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import React from 'react'


type resolverProps = {
    resolver?: any,
    defaultValues?: Record<string, any>
}

type fromProps = {
    className?:string,
    children: React.ReactNode,
    onSubmit: SubmitHandler<FieldValues>,
    resolver?: any
} & resolverProps

function Form({ children,className, onSubmit, defaultValues, resolver }:fromProps) {
    const resolverConfig: resolverProps = {}

    if(defaultValues) {
        resolverConfig["defaultValues"] = defaultValues
    }

    if (resolver) {
        resolverConfig["resolver"] = zodResolver(resolver)
    }

    const methods = useForm(resolverConfig)

  
  const {handleSubmit,reset}=methods


 const submit:SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    reset()
}

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(submit)}>
       <div className={cn('w-full',className)}>
       {children}
       </div>
    </form>
  </FormProvider>
  )
}

export default Form