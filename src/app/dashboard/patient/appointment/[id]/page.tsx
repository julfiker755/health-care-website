"use client";
import { DashTitle } from "@/components/reusable/dash-title";
import { useGetSingleAppointmentQuery } from "@/redux/api/appointmentApi";
import { useGetSingleProfileQuery } from "@/redux/api/commonApi";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import { PlaceholderImg } from "@/lib/utils";
import { ParamsProps } from "@/types";
import Image from "next/image";
import React from "react";

export default function SingleAppointment({ params: { id } }: ParamsProps) {
  const { data } = useGetSingleAppointmentQuery(id);
  const { data: user } = useGetSingleProfileQuery({});
  const { patientId, doctorId, videoCallingId, schedule, status } = data || {};
  const { data: doctorInfo } = useGetSingleDoctorQuery(doctorId);

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
                  user?.profilePhoto !== null
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user?.profilePhoto}`
                    : PlaceholderImg(200, 200)
                }
                width={80}
                height={100}
                alt={user?.profilePhoto?.toString()}
              />
            </div>
            <div>
              <h1 className="text-base">Name</h1>
              <h1 className="text-sm text-gray-500">{user?.name}</h1>
              <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                {user?.gender === "MALE" ? "Male" : "Female"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Email</h1>
              <h1 className="text-sm text-gray-500">{user?.email}</h1>
            </div>
            <div>
              <h1 className="text-base">Contact Number</h1>
              <h1 className="text-sm text-gray-500">{user?.contactNumber}</h1>
            </div>
            <div>
              <h1 className="text-base">Blood</h1>
              <h1 className="text-sm text-gray-500">{user?.blood}</h1>
            </div>
            <div>
              <h1 className="text-base">Age</h1>
              <h1 className="text-sm text-gray-500">{user?.age}</h1>
            </div>
            <div>
              <h1 className="text-base">Video Calling Id</h1>
              <h1 className="text-sm text-gray-500">
                {status == "COMPLETED" ? videoCallingId : "*************"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Date</h1>
              <h1 className="text-sm text-gray-500">{schedule?.date}</h1>
            </div>
            <div>
              <h1 className="text-base">Start Time</h1>
              <h1 className="text-sm text-gray-500">{schedule?.startTime}</h1>
            </div>
            <div>
              <h1 className="text-base">End Time</h1>
              <h1 className="text-sm text-gray-500">{schedule?.endTime}</h1>
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
                  doctorInfo?.profilePhoto !== null
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${doctorInfo?.profilePhoto}`
                    : PlaceholderImg(200, 200)
                }
                width={80}
                height={100}
                alt={doctorInfo?.profilePhoto?.toString()}
              />
            </div>
            <div>
              <h1 className="text-base">Name</h1>
              <h1 className="text-sm text-gray-500">{doctorInfo?.name}</h1>
              <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                {doctorInfo?.gender === "MALE" ? "Male" : "Female"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Email</h1>
              <h1 className="text-sm text-gray-500">{doctorInfo?.email}</h1>
            </div>
            <div>
              <h1 className="text-base">Contact Number</h1>
              <h1 className="text-sm text-gray-500">
                {doctorInfo?.contactNumber}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Appointment Fee</h1>
              <h1 className="text-sm text-gray-500">
                {doctorInfo?.appointmentFee}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Qualification</h1>
              <h1 className="text-sm text-gray-500">
                {doctorInfo?.qualification}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Designation</h1>
              <h1 className="text-sm text-gray-500">
                {doctorInfo?.designation}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Average Rating</h1>
              <h1 className="text-sm text-gray-500">
                {doctorInfo?.averageRating}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Address</h1>
              <h1 className="text-sm text-gray-500">{doctorInfo?.address}</h1>
            </div>
            <div>
              <h1 className="text-base">Working Place</h1>
              <h1 className="text-sm text-gray-500">
                {doctorInfo?.currentWorkingPlace}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
