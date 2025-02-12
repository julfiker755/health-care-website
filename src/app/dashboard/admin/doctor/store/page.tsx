"use client";
import { FromInput, SingleSelect } from "@/components/reusable";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { DashTitle } from "@/components/reusable/dash-title";
import { ResponseApiErrors, ShowToast } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/from";
import { Button } from "@/components/ui";
import { doctorSchema } from "@/types";
import { delay } from "@/lib/utils";

export default function DoctorStore() {
  const router = useRouter();
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();
  const from = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      password: "",
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      experience: "",
      gender: "",
      appointmentFee: "",
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const { password, experience, appointmentFee, ...doctorData } = values;
    const data = {
      password,
      doctor: {
        ...doctorData,
        experience: Number(experience) || 0,
        appointmentFee: Number(appointmentFee) || 0,
      },
    };
    const res = await createDoctor(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Store Successful",
        description: "You have Doctor Store successfully",
      });
      await delay(4000);
      from.reset();
      router.push("/dashboard/admin/doctor");
    }
    ResponseApiErrors(res, from);
  };

  return (
    <div>
      <DashTitle
        className="mb-5"
        title="Add Doctor"
        description="Add and manage detailed doctor profiles efficiently"
      ></DashTitle>

      <Form
        className="gap-y-5 gap-x-4 grid grid-cols-1 lg:grid-cols-3"
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
          label="Registration Number"
          name="registrationNumber"
          placeholder="Enter your registration"
        ></FromInput>
        <FromInput
          type="number"
          label="Experience"
          name="experience"
          placeholder="Enter your experience"
        ></FromInput>
        <FromInput
          type="number"
          label="Appointment Fee"
          name="appointmentFee"
          placeholder="Enter your appointment fee"
        ></FromInput>
        <FromInput
          label="Qualification"
          name="qualification"
          placeholder="Enter your qualification"
        ></FromInput>
        <FromInput
          label="Designation"
          name="designation"
          placeholder="Enter your designation"
        ></FromInput>
        <FromInput
          label="Working Place"
          name="currentWorkingPlace"
          placeholder="Enter your working place"
        ></FromInput>
        <FromInput
          label="Address"
          name="address"
          placeholder="Enter your address"
        ></FromInput>
        <div className="lg:col-span-3 flex justify-end">
          <Button disabled={isLoading} className="w-fit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
