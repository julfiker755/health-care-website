"use client";
import { NoItemData } from "@/components/reusable";
import { DashTitle } from "@/components/reusable/dash-title";
import { Badge, Skeleton } from "@/components/ui";
import { formatDate, PlaceholderImg } from "@/lib/utils";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import Image from "next/image";
import React from "react";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function DoctorDetails({ params: { id } }: ParamsProps) {
  const { data, isLoading } = useGetSingleDoctorQuery(id);
  return (
    <div>
      <DashTitle
        className="mb-5"
        title="Doctor Information"
        description="Efficiently add and manage comprehensive doctor profiles with ease"
      />
      <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border p-2 rounded-md">
          <h1 className="font-medium">Basic Info</h1>
          <div className="mt-3 grid gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="border size-[80px] rounded-sm">
              <Image
                className="w-full h-full rounded-sm"
                src={
                  data?.profilePhoto !== null
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.profilePhoto}`
                    : PlaceholderImg(200, 200)
                }
                width={80}
                height={100}
                alt={data?.profilePhoto?.toString()}
              />
            </div>
            <div>
              <h1 className="text-base">Name</h1>
              <h1 className="text-sm text-gray-500">{data?.name}</h1>
              <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                {data?.gender === "MALE" ? "Male" : "Female"}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Email</h1>
              <h1 className="text-sm text-gray-500">{data?.email}</h1>
            </div>
            <div>
              <h1 className="text-base">Deactivate</h1>
              <h1 className="text-sm text-gray-500">
                <Badge variant={data?.isDeleted ? "yes" : "no"}>
                  {data?.isDeleted ? "Yes" : "No"}
                </Badge>
              </h1>
            </div>
            <div>
              <h1 className="text-base">Contact Number</h1>
              <h1 className="text-sm text-gray-500">{data?.contactNumber}</h1>
            </div>
            <div>
              <h1 className="text-base">Registration Number</h1>
              <h1 className="text-sm text-gray-500">
                {data?.registrationNumber}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Appointment Fee</h1>
              <h1 className="text-sm text-gray-500">{data?.appointmentFee}</h1>
            </div>
            <div>
              <h1 className="text-base">Qualification</h1>
              <h1 className="text-sm text-gray-500">{data?.qualification}</h1>
            </div>
            <div>
              <h1 className="text-base">Designation</h1>
              <h1 className="text-sm text-gray-500">{data?.designation}</h1>
            </div>
            <div>
              <h1 className="text-base">Working Place</h1>
              <h1 className="text-sm text-gray-500">
                {data?.currentWorkingPlace}
              </h1>
            </div>
            <div>
              <h1 className="text-base">Average Rating</h1>
              <h1 className="text-sm text-gray-500">{data?.averageRating}</h1>
            </div>
            <div>
              <h1 className="text-base">Address</h1>
              <h1 className="text-sm text-gray-500">{data?.address}</h1>
            </div>
            <div>
              <h1 className="text-base">CreatedAt</h1>
              <h1 className="text-sm text-gray-500">
                {formatDate(data?.createdAt)}
              </h1>
            </div>
            <div>
              <h1 className="text-base">UpdatedAt</h1>
              <h1 className="text-sm text-gray-500">
                {formatDate(data?.updatedAt)}
              </h1>
            </div>
          </div>
        </div>
        <div className="border p-2 rounded-md">
          <h1 className="font-medium">Specialities Info</h1>
          <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-2 lg:flex items-center gap-2"
                >
                  <Skeleton className="size-16 m-auto lg:m-0 mb-1 lg:mb-0 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 m-auto lg:m-0 w-[150px]" />
                    <Skeleton className="h-3 m-auto lg:m-0 w-[100px]" />
                  </div>
                </div>
              ))
            ) : !!data?.specialities?.length ? (
              <>
                {data?.specialities?.map((item: any, index: any) => (
                  
                  <div
                    className="border rounded-md p-3 lg:flex items-center gap-1"
                    key={index}
                  >
                    <div className="border text-center size-16 m-auto lg:m-0  overflow-hidden  rounded-full">
                      <Image
                        className="w-full h-full m-auto object-fill"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.icon}`}
                        width={30}
                        height={100}
                        alt="image in picture"
                        style={{
                          width: "50px",
                          height: "64px",
                          padding: "2px",
                        }}
                      ></Image>
                    </div>
                    <div className="text-center lg:text-start">
                      <h1 className="text-lg font-medium">{item.title}</h1>
                      <h3 className="text-sm text-gray-800">
                        Active
                      </h3>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="col-span-2">
                <NoItemData className="lg:py-40" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 p-2 border rounded-md">
        <h1 className="font-medium">Review Info</h1>
        <div className="mt-3">
          <p className="text-gray-400 py-3">Review Data comming</p>
        </div>
      </div>
    </div>
  );
}
