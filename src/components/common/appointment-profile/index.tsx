import { PlaceholderImg } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function AppointmentProfile({
  name,
  qualification,
  specialities,
  address,
  profilePhoto,
}: any) {
  return (
    <div className="bg-white px-3 py-2 rounded-md">
      <div className="flex gap-3 items-center">
        <Image
          className="rounded-full object-cover bg-center bg-cover"
          src={
            profilePhoto !== null
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${profilePhoto}`
              : PlaceholderImg()
          }
          alt="single profile"
          width={100}
          height={100}
          style={{
            width: "80px",
            height: "80px",
          }}
        ></Image>
        <ul>
          <li className="font-medium">{name}</li>
          <li className="text-xs">
            {qualification}&nbsp;-&nbsp;
            {specialities?.[0]?.title || "Cardiology"}
          </li>
          <li className="text-gray-500 text-sm">{address}</li>
        </ul>
      </div>
    </div>
  );
}
