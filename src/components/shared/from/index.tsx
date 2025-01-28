import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler
} from "react-hook-form";
import { cn } from "@/lib/utils";



type fromProps = {
  className?: string;
  children: React.ReactNode;
  onSubmit: (data: FieldValues) => void;
  from:any 
};

function Form({ children, className, onSubmit, from }: fromProps) {
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // form.reset(); 
  };

  return (
    <FormProvider {...from}>
      <form onSubmit={from.handleSubmit(submit)}>
        <div className={cn("w-full", className)}>{children}</div>
      </form>
    </FormProvider>
  );
}

export default Form;
