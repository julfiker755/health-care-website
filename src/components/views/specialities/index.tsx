"use client";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { Title } from "@/components/reusable";
import { Skeleton } from "@/components/ui";
import Image from "next/image";
import React from "react";

export default function Specialities() {
  const { data: specialities, isLoading } = useGetAllSpecialitiesQuery({});
  return (
    <div className="container py-10 lg:py-20">
      <Title className="pb-5" title="Specialities"></Title>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {isLoading ? (
          [...Array(8)].map((_, index) => (
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
        ) : !!specialities?.length ? (
          <>
            {specialities.map((item: any, index: any) => (
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
                    {item?.doctor?.length} Doctors
                  </h3>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="font-medium text-xl text-gray-300">Data Not found</h1>
        )}
      </div>
    </div>
  );
}
