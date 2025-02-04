"use client";
import FromInput from "@/components/reusable/from-input";
import Form from "@/components/shared/from";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { resetSchema } from "@/components/types";
import { Button } from "@/components/ui";



export default function ResetPassword() {
  const from = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      new_password:"",
      confirm_password:""
    },
  });

  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[440px] lg:p-5 border p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-xl lg:text-2xl font-semibold">Change Password</h1>
          <p className="text-sm">Protect your account with a new password</p>
        </div>

        <Form className="space-y-3" from={from} onSubmit={handleSubmit}>
          <FromInput
            eye={true}
            label="New Password"
            name="new_password"
            placeholder="Enter your password"
          />
          <FromInput
            eye={true}
            label="Confirm Password"
            name="confirm_password"
            placeholder="Enter your password"
          />
          <Button className="w-full">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
