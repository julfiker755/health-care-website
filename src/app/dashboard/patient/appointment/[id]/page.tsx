"use client"
import { DashTitle } from "@/components/reusable/dash-title";
import { PlaceholderImg } from "@/lib/utils";
import { useGetMyAppointmentQuery } from "@/redux/api/appointmentApi";
import Image from "next/image";
import React from "react";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function SingleAppointment({ params: { id } }: ParamsProps) {
  const { data, isLoading } = useGetMyAppointmentQuery({});
  const currentData=!isLoading && data?.find((item:any)=>item?.id == id)
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
                  currentData?.patient?.profilePhoto !== null
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${currentData?.patient?.profilePhoto}`
                    : PlaceholderImg(200, 200)
                }
                width={80}
                height={100}
                alt={currentData?.doctor?.profilePhoto?.toString()}
              />
            </div>
            <div>
              <h1 className="text-base">Name</h1>
              <h1 className="text-sm text-gray-500">{currentData?.patient?.name}</h1>
              <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                {currentData?.patient?.gender === "MALE" ? "Male" : "Female"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Email</h1>
              <h1 className="text-sm text-gray-500">{currentData?.patient?.email}</h1>
            </div>
            <div>
              <h1 className="text-base">Contact Number</h1>
              <h1 className="text-sm text-gray-500">{currentData?.patient?.contactNumber}</h1>
            </div>
            <div>
              <h1 className="text-base">Blood</h1>
              <h1 className="text-sm text-gray-500">{currentData?.patient?.blood}</h1>
            </div>
            <div>
              <h1 className="text-base">Age</h1>
              <h1 className="text-sm text-gray-500">{currentData?.patient?.age}</h1>
            </div>
            <div>
              <h1 className="text-base">Video Calling Id</h1>
              <h1 className="text-sm text-gray-500">{currentData?.videoCallingId}</h1>
            </div>
            <div>
              <h1 className="text-base">Date</h1>
              <h1 className="text-sm text-gray-500">{currentData?.schedule?.date}</h1>
            </div>
            <div>
              <h1 className="text-base">Start Time</h1>
              <h1 className="text-sm text-gray-500">{currentData?.schedule?.startTime}</h1>
            </div>
            <div>
              <h1 className="text-base">End Time</h1>
              <h1 className="text-sm text-gray-500">{currentData?.schedule?.endTime}</h1>
            </div>
          </div>
         </div>
         <div className="border p-2 rounded-md">
         <h1 className="font-medium">Doctor Info</h1>
         <div className="mt-3 grid gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="border size-[80px] rounded-sm">
              <Image
                className="w-full h-full rounded-sm"
                src={
                  currentData?.doctor?.profilePhoto !== null
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${currentData?.doctor?.profilePhoto}`
                    : PlaceholderImg(200, 200)
                }
                width={80}
                height={100}
                alt={currentData?.doctor?.profilePhoto?.toString()}
              />
            </div>
            <div>
              <h1 className="text-base">Name</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.name}</h1>
              <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                {currentData?.doctor?.gender === "MALE" ? "Male" : "Female"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Email</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.email}</h1>
            </div>
            <div>
              <h1 className="text-base">Contact Number</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.contactNumber}</h1>
            </div>
            <div>
              <h1 className="text-base">Appointment Fee</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.appointmentFee}</h1>
            </div>
            <div>
              <h1 className="text-base">Qualification</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.qualification}</h1>
            </div>
            <div>
              <h1 className="text-base">Designation</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.designation}</h1>
            </div>
            <div>
              <h1 className="text-base">Average Rating</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.averageRating}</h1>
            </div>
            <div>
              <h1 className="text-base">Address</h1>
              <h1 className="text-sm text-gray-500">{currentData?.doctor?.address}</h1>
            </div>
            <div>
              <h1 className="text-base">Working Place</h1>
              <h1 className="text-sm text-gray-500">
                {currentData?.doctor?.currentWorkingPlace}
              </h1>
            </div>
          </div>
         </div>
      </div>
    </div>
  );
}
