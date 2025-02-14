"use client";
import { FromInput, SingleSelect } from "@/components/reusable";
import { DashTitle } from "@/components/reusable/dash-title";
import { ResponseApiErrors, ShowToast } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/from";
import { Button } from "@/components/ui";
import { delay } from "@/lib/utils";
import { adminSchema } from "@/types";
import { useCreateAdminMutation } from "@/redux/api/adminApi";

export default function DoctorStore() {
  const [createAdmin] = useCreateAdminMutation();
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      password: "",
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      gender: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const { password, ...adminData } = values;
    const data = {
      password,
      admin: {
        ...adminData,
      },
    };
    const res = await createAdmin(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Store Successful",
        description: "You have admin Store successfully",
      });
      await delay(4000);
      from.reset();
      router.push("/dashboard/super-admin/admin");
    }
    ResponseApiErrors(res, from);
  };

  return (
    <div>
      <DashTitle
        className="mb-5"
        title="Add Admin"
        description="Add and manage detailed admin profiles efficiently"
      ></DashTitle>

      <Form
        className="gap-y-5 gap-x-4 grid grid-cols-1 lg:grid-cols-2"
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
        <SingleSelect
          items={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
          label="Gender"
          name="gender"
          placeholder="Select gender"
        ></SingleSelect>
        <FromInput
          label="Contact Number"
          name="contactNumber"
          type="tel"
          placeholder="Enter your contact"
        ></FromInput>
        <FromInput
          label="Address"
          name="address"
          placeholder="Enter your address"
        ></FromInput>
        <div className="lg:col-span-2 flex justify-end">
          <Button className="w-fit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
