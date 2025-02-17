"use client";
import { useCreatePatientMutation } from "@/redux/api/patientApi";
import { SingleSelect } from "@/components/reusable/select";
import { ResponseApiErrors, ShowToast } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "@/components/reusable";
import { registerSchema } from "@/types/schema";
import Form from "@/components/shared/from";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { delay } from "@/lib/utils";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [createPatient, { isLoading }] = useCreatePatientMutation();
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

  const handleSubmit = async (values: FieldValues) => {
    const { password, confirm_password, ...valuesInfo } = values;
    const data = {
      password: password,
      patient: { ...valuesInfo },
    };

    const res = await createPatient(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Register Successful",
        description: "You have Register successfully",
      });
      await delay(4000);
      router.push("/auth");
      from.reset();
    }
    ResponseApiErrors(res, from);
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
            type="tel"
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
          <Button
            disabled={isLoading}
            className="w-full col-span-1 lg:col-span-2"
          >
            Submit
          </Button>
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
