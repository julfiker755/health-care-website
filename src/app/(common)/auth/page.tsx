"use client";
import FromInput from "@/components/reusable/from-input";
import Form from "@/components/shared/from";
import { Button, Checkbox } from "@/components/ui";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import React from "react";
import { authSchema } from "@/components/types";

export default function AuthPage() {
  const defaultValue={
    email:"",
    password:""
 }

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[440px] lg:p-5 border p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="text-sm">Enter your email and password below</p>
          <p className="text-sm">to log into your account</p>
        </div>

        <Form className="space-y-3" defaultValues={defaultValue} resolver={authSchema} onSubmit={handleSubmit}>
          <FromInput label="Email" name="email"></FromInput>
          <FromInput label="Password" name="password"></FromInput>
          <ul className="flex justify-between">
            <li className="text-sm flex items-center gap-1">
              <Checkbox />
              Remember Me
            </li>
            <li className="text-sm">Forgot Password?</li>
          </ul>
          <Button className="w-full">Login</Button>
        </Form>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#1C5B91]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
