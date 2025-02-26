"use client"
import React from "react";
import { IconStarFilled } from '@tabler/icons-react';
import { NoItemData, Title } from "@/components/reusable";
import Image from "next/image";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import { PlaceholderImg } from "@/lib/utils";
import { Skeleton } from "@/components/ui";
import Link from "next/link";

export default function BestDoctors() {
    const { data, isLoading } = useGetAllDoctorQuery({});
  return (
    <div className="container">
      <Title className="pb-5" title="Best Doctors"></Title>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <div key={index} className="border border-gray-100 rounded-md p-2">
                    <div className="relative">
                      <Skeleton className="w-full h-[180px]" />
                    </div>
                    <div className="py-2 flex justify-between">
                      <Skeleton className="w-[120px] h-[20]" />
                      <Skeleton className="w-[80px] h-[20px]" />
                    </div>
                    <Skeleton className="w-[120px] h-[20px]" />
                  </div>
                ))
              ) : data?.doctors?.length > 0 ? (
                data?.doctors?.slice(0,4).map((item: any) => (
                  <Link href={`/doctors/${item.id}`} key={item.id}>
                    <div className="border rounded-md p-2">
                      <div className="relative">
                        <Image
                          src={
                            item.profilePhoto !== null
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.profilePhoto}`
                              : PlaceholderImg()
                          }
                          alt="77"
                          className="m-auto relative rounded-sm"
                          width={200}
                          height={100}
                          style={{
                            width: "100%",
                            display: "block",
                            margin: "auto",
                            maxWidth: "100%",
                            height: "180px",
                          }}
                        ></Image>
                      </div>
                      <div className="py-2 flex justify-between">
                        <ul>
                          <li className="text-lg font-medium">{item.name}</li>
                          <li className="text-gray-600 text-sm">
                            {item.qualification}
                          </li>
                        </ul>
                        <div className="bg-[#1C5B91] flex items-center gap-[2px] w-fit h-fit text-white px-2 rounded-md text-sm">
                          <IconStarFilled size={16} />
                          {item.averageRating}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3">
                  <NoItemData title="No Doctor Found" />
                </div>
              )}
            </div>
    </div>
  );
}
