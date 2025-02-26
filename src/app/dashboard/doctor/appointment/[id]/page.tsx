"use client"
import { DashTitle } from "@/components/reusable/dash-title";
import { PlaceholderImg } from "@/lib/utils";
import { useGetDoctorAppointmentQuery} from "@/redux/api/appointmentApi";
import Image from "next/image";
import React from "react";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function SingleAppointment({ params: { id } }: ParamsProps) {
  const {data,isLoading}=  useGetDoctorAppointmentQuery({})
  const currentData=!isLoading && data?.find((item:any)=>item?.appointment?.id == id)
  return (
    <div>
      <DashTitle
        className="mb-5"
        title="Appointment Information"
        description="Efficiently add and manage comprehensive appointment profiles with ease"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div className="border p-2 rounded-md">
         <h1 className="font-medium">General Info</h1>
         <div className="mt-3 grid gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="border size-[80px] rounded-sm">
              <Image
                className="w-full h-full rounded-sm"
                src={
                  currentData?.appointment?.patient?.profilePhoto !== null
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${currentData?.appointment?.patient?.profilePhoto}`
                    : PlaceholderImg(200, 200)
                }
                width={80}
                height={100}
                alt={currentData?.appointment?.patient?.profilePhoto?.toString()}
              />
            </div>
            <div>
              <h1 className="text-base">Name</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.patient?.name}</h1>
              <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                {currentData?.appointment.patient?.gender === "MALE" ? "Male" : "Female"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Email</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.patient?.email}</h1>
            </div>
            <div>
              <h1 className="text-base">Contact Number</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.patient?.contactNumber}</h1>
            </div>
            <div>
              <h1 className="text-base">Blood</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.patient?.blood}</h1>
            </div>
            <div>
              <h1 className="text-base">Age</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.patient?.age}</h1>
            </div>
            <div>
              <h1 className="text-base">Video Calling Id</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.videoCallingId}</h1>
            </div>
            <div>
              <h1 className="text-base">Date</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.schedule?.date}</h1>
            </div>
            <div>
              <h1 className="text-base">Start Time</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.schedule?.startTime}</h1>
            </div>
            <div>
              <h1 className="text-base">End Time</h1>
              <h1 className="text-sm text-gray-500">{currentData?.appointment?.schedule?.endTime}</h1>
            </div>
          </div>
         </div>
      </div>
    </div>
  );
}
