"use client";
import { FromInput } from "@/components/reusable";
import Form from "@/components/shared/from";
import {registerSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui";
import { SingleSelect } from "@/components/reusable/select";
import Link from "next/link";

export default function Register() {
  const from = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      contactNumber: "",
      gender: "",
    },
  });

  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[500px] lg:p-5 border p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold">Register</h1>
          <p className="text-sm">Enter your email and password below</p>
          <p className="text-sm">to log into your account</p>
        </div>

        <Form
          className="grid gap-4 grid-cols-1 lg:grid-cols-2"
          from={from}
          onSubmit={handleSubmit}
        >
          <FromInput
            label="Name"
            name="name"
            placeholder="Enter your Name"
          ></FromInput>
          <FromInput
            label="Email"
            name="email"
            placeholder="Enter your email"
          ></FromInput>
          <FromInput
            eye={true}
            label="Password"
            name="password"
            placeholder="Enter your password"
          ></FromInput>
          <FromInput
            eye={true}
            label="Confirm Password"
            name="confirm_password"
            placeholder="Enter your password"
          ></FromInput>
          <FromInput
            label="Contact Number"
            name="contactNumber"
            placeholder="Enter your contact"
          ></FromInput>
          <SingleSelect
            items={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
              ]}
            label="Gender"
            name="gender"
            placeholder="Select gender"
          ></SingleSelect>
          <Button className="w-full col-span-1 lg:col-span-2">Submit</Button>
        </Form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth" className="text-[#1C5B91]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
