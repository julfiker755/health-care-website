"use client";
import { FromInput } from "@/components/reusable";
import Form from "@/components/shared/from";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { forgotSchema } from "@/types/schema";
import { Button } from "@/components/ui";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { ResponseApiErrors } from "@/helpers";
import { Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const from = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const handleSubmit = async (values: FieldValues) => {
    const res = await forgotPassword(values).unwrap();
    if (res.id) {
      from.reset();
      setIsShow(false);
    }
    ResponseApiErrors(res, from);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {isShow ? (
        <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[440px] lg:p-5 border p-5 rounded-md">
          <div className="text-center mb-4">
            <h1 className="text-xl lg:text-2xl font-semibold">
              Forgot Password
            </h1>
            <p className="text-sm">
              Please provide your email to reset your password
            </p>
          </div>

          <Form className="space-y-3" from={from} onSubmit={handleSubmit}>
            <FromInput
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading ? "Waiting.." : " Submit"}
            </Button>
          </Form>

          <p className="text-sm text-center">
            Remember your password?{" "}
            <Link href="/auth" className="text-[#1C5B91]">
              Login
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="max-w-sm w-full bg-white rounded-2xl border p-2 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="mt-4 capitalize text-xl font-semibold text-gray-800">
            Check your email
            </h2>
            <p className="mt-2 text-gray-600">
              Your password change request will be processed in <span className="text-red-500">5 </span>minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
