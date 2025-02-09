"use client";
import { FromInput } from "@/components/reusable";
import Form from "@/components/shared/from";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { forgotSchema } from "@/types/schema";
import { Button} from "@/components/ui";
import Link from "next/link";




export default function ForgotPassword() {
  const from = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[440px] lg:p-5 border p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-xl lg:text-2xl font-semibold">Forgot Password</h1>
          <p className="text-sm">Enter your email to reset your password.</p>
        </div>

        <Form className="space-y-3" from={from} onSubmit={handleSubmit}>
          <FromInput label="Email" name="email" placeholder="Enter your email" />
          <Button className="w-full">Submit</Button>
        </Form>

        <p className="text-sm text-center">
          Remember your password?{" "}
          <Link href="/auth" className="text-[#1C5B91]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
