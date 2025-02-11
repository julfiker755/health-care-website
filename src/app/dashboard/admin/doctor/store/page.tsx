"use client";
import { FromInput, SingleSelect } from "@/components/reusable";
import { DashTitle } from "@/components/reusable/dash-title";
import Form from "@/components/shared/from";
import { Button } from "@/components/ui";
import { doctorSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function DoctorStore() {
  const from = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      password: "",
      name:"",
      email: "",
      contactNumber:"",
      address:"",
      registrationNumber:"",
      experience:"",
      gender:"",
      appointmentFee:"",
      qualification:"",
      currentWorkingPlace:"",
      designation:"",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    values.experience=Number(values.experience) || 0
    values.appointmentFee=Number(values.appointmentFee) || 0
    values.contactNumber=values.contactNumber.toString()

    const data ={
      password:values.password,
      doctor:{
        name:values.name,
        email:values.email,
        contactNumber:values.contactNumber,
        address:values.address,
        registrationNumber:values.registrationNumber,
        experience:values.experience,
        gender:values.gender,
        appointmentFee:values.appointmentFee,
        qualification:values.qualification,
        currentWorkingPlace:values.currentWorkingPlace,
        designation:values.designation,
      }
    }
    console.log(data)
  };

  return (
    <div>
      <DashTitle
        className="mb-5"
        title="Add Doctor"
        description="Add and manage detailed doctor profiles efficiently."
      ></DashTitle>

      <Form
        className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
          type="number"
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
          placeholder="Enter your working address"
        ></FromInput>
        <div className="col-span-3 flex justify-end">
          <Button className="w-fit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
