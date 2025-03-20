"use client";
import { Button, Skeleton } from "@/components/ui";
import { PlaceholderImg } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RatingScore } from "../rating";

export function SmallDocCard({ item }: { item: any }) {
  return (
    <div key={item?.id} className="border rounded-md px-2 pt-2">
      <div className="relative">
        <Image
          src={
            item?.profilePhoto !== null
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
      <div className="py-2">
        <ul className="flex justify-between pb-1">
          <li>
            <RatingScore value={item?.averageRating} />
          </li>
          <li className="bg-[#2e2ee6] flex items-center gap-[2px] w-fit h-fit text-white px-2 text-sm rounded-[3px]">
            {item?.averageRating}
          </li>
        </ul>
        <ul>
          <li className="text-lg font-medium">{item.name}</li>
          <li className="text-gray-700 text-xs">
            {item?.qualification}&nbsp;-&nbsp;
            {item?.specialities?.[0]?.title || "Cardiology"}
          </li>
        </ul>
        <hr className="my-[6px]" />
        <ul className="flex justify-between">
          <li>
            <Link href={`/doctors/${item.id}`}>
              <Button
                className="rounded-full bg-[#012047] hover:bg-[#012047]/90"
                size="sm"
              >
                View Profile
              </Button>
            </Link>
          </li>
          <li>
            <Button className="rounded-full" size="sm">
              Book Now
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function SmallDocSkeleton() {
  return [...Array(4)].map((_, index) => (
    <div key={index} className="border border-gray-100 rounded-md p-2">
      <div className="relative">
        <Skeleton className="w-full h-[150px]" />
      </div>
      <div className="py-1 flex justify-between">
        <Skeleton className="w-[120px] h-[18px]" />
        <Skeleton className="w-[60px] h-[18px]" />
      </div>
      <Skeleton className="w-[160px] h-[18px]" />
      <Skeleton className="w-[100px] mt-1 h-[15px]" />
      <Skeleton className="w-full mt-1 h-[4px]" />
      <div className="flex justify-between">
        <Skeleton className="w-[80px] mt-1 h-[20px]" />
        <Skeleton className="w-[80px] mt-1 h-[20px]" />
      </div>
    </div>
  ));
}

// BigDocCard
export function BigDocCard({ item }: { item: any }) {
  return (
    <div className="border flex gap-4 rounded-md p-2">
      <div className="relative lg:w-[280px]">
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
            height: "130px",
          }}
        ></Image>
      </div>
      <div className="flex justify-between w-full items-center pr-10">
        <ul className="space-y-1 [&>li]:text-sm [&>li]:text-gray-700">
          <li className="!text-lg !font-semibold">{item.name}</li>
          <li>
            {item?.qualification}&nbsp;-&nbsp;
            {item?.specialities[0]?.title || "Cardiology"}
          </li>
          <li>Consultation Fees: ${item.appointmentFee}</li>
          <li>Designation: {item.designation}</li>
          <li>Contact: {item.contactNumber}</li>
        </ul>
        <ul className="space-y-1 flex flex-col items-center">
          <li>
            <RatingScore value={item?.averageRating} />
          </li>
          <li className="bg-[#2e2ee6] flex items-center gap-[2px] w-fit h-fit text-white px-2 text-sm rounded-[3px]">
            {item?.averageRating}
          </li>
          <li>
            <Link href={`/doctors/${item.id}`}>
              <Button className="rounded-md">View Profile</Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
