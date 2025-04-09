"use client";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import React, { useState } from "react";
import { Hospital, Blinds } from "lucide-react";
import Image from "next/image";
import assets from "@/assets";
import { Input, Label } from "@/components/ui";

export function Step1Appointment() {
  const [isType, setIsType] = useState("clinic");
  const appointmenItem = [
    {
      icon: Hospital,
      text: "In-Clinic Visit",
      type: "clinic",
    },
    {
      icon: Blinds,
      text: "Online Consultation",
      type: "online",
    },
  ];
  const clinicItem = [
    // {
    //   img: "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/clinic-icon-01.svg",
    //   text: "AllCare Family Medicine",
    //   address: "3343 Private Lane",
    // },
    {
      img: "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/clinic-icon-02.svg",
      text: "Vitalplus Clinic",
      address: "4223 Pleasant Hill Road",
    },
    {
      img: "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/clinic-icon-03.svg",
      text: "Wellness Path Chiropractic",
      address: "418 Patton Lane, Garner",
    },
  ];

  return (
    <div>
      <h1 className="font-medium mb-2">Select Appointment Type</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {appointmenItem.map((item, index) => (
          <div
            onClick={() => setIsType(item.type)}
            key={index}
            className={`border ${
              item?.type === isType && "border-[#0088beee]"
            } py-3 rounded-md cursor-pointer`}
          >
            <h1 className="flex justify-center">
              {<item.icon size={20} className="text-gray-600" />}
            </h1>
            <h1 className="text-center">{item.text}</h1>
          </div>
        ))}
      </div>
      {isType === "clinic" && (
        <div className="grid grid-cols-1 mt-3 lg:grid-cols-2 gap-3">
          {clinicItem.map((item, index) => (
            <div
              key={index}
              className="flex gap-2  items-center border rounded-md p-1"
            >
              <Image
                src={
                  item.img
                  // item?.profilePhoto !== null
                  //   ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.profilePhoto}`
                  //   : PlaceholderImg()
                }
                alt="item"
                width={50}
                height={100}
                className="rounded-full"
              ></Image>
              <ul>
                <li>{item.text}</li>
                <li className="text-sm text-gray-500">{item.address}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export function Step2Schedule() {
  const { data } = useGetSingleDoctorQuery(
    "5c594043-832a-455f-9a80-dafc2c3cb4c1"
  );

  return (
    <div>
      <h1 className="font-medium mb-2">Select Schedule</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {data?.schedule?.map((item: any, index: any) => (
          <div
            key={index}
            className={`border py-2 transition-all text-center rounded-md cursor-pointer hover:border-[#0088beee]`}
          >
            <h1 className="text-[15px]">{item.date}</h1>
            <h1 className="text-sm">{item.day}</h1>
            <h1 className="text-sm">
              {item.startTime}-{item.endTime}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Step2Information() {
  return (
    <div className="bg-white my-3 px-3 py-2 rounded-md">
      <h1 className="font-medium mb-2">Patient Information</h1>
      <div className="text-base grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ul>
          <li className="font-medium text-sm">Name</li>
          <li className="text-sm text-gray-500">Dr. John Doe</li>
        </ul>
        <ul>
          <li className="font-medium text-sm">Email</li>
          <li className="text-sm text-gray-500">Patient@demo.com</li>
        </ul>
        <ul>
          <li className="font-medium text-sm">Age</li>
          <li className="text-sm text-gray-500">34</li>
        </ul>
        <ul>
          <li className="font-medium text-sm">Blood</li>
          <li className="text-sm text-gray-500">A+</li>
        </ul>
        <ul>
          <li className="font-medium text-sm">Contact</li>
          <li className="text-sm text-gray-500">01741703755</li>
        </ul>
        <ul>
          <li className="font-medium text-sm">Address</li>
          <li className="text-sm text-gray-500">
            789 Serenity St, Calm City, CC 12345
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Step3Payment() {
  const gatewayItem = [
    {
      img: assets.payment.stripe,
      text: "Stripe",
    },
    {
      img: assets.payment.sslcommerz,
      text: "Sslcommerz ",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border p-2 rounded-md">
        <h1 className="font-medium mb-2">Payment Gateway</h1>
        <div className="flex gap-2">
          {gatewayItem.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 px-2 py-1 rounded-md border items-center"
            >
              <h1>
                {" "}
                <Image
                  src={item.img}
                  alt="item"
                  width={25}
                  height={100}
                  className="rounded-full"
                ></Image>
              </h1>
              <h1>{item.text}</h1>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2">
          <div>
            <Label>Email Address</Label>
            <Input placeholder="Email Address"></Input>
          </div>
          <div>
            <Label>Password</Label>
            <Input placeholder="Password"></Input>
          </div>
        </div>
      </div>
      <div className="border p-2 rounded-md">
        <h1 className="font-medium mb-2">Booking Info</h1>
        <div className="space-y-2">
          <ul>
            <li className="text-sm font-medium">Date & Time</li>
            <li className="text-sm">10:00 - 11:00 AM, 15, Oct 2025</li>
          </ul>
          <ul>
            <li className="text-sm font-medium">Appointment type</li>
            <li className="text-sm">Clinic (Wellness Path)</li>
          </ul>
        </div>
        <div className="py-2">
          <hr />{" "}
        </div>
        <h1 className="font-medium mb-2">Payment Info</h1>
        <ul className="border-b mb-2">
          <li className="flex justify-between text-sm">
            <span>Booking Fees</span>
            <span>$20</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Tax</span>
            <span>$18</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Discount</span>
            <span>$15</span>
          </li>
        </ul>
        <div className="flex justify-between text-sm">
          <span>total</span>
          <span>$100</span>
        </div>
      </div>
    </div>
  );
}
export function Step4Confirmation() {
  return (
    <div>
      <h1>Booking area of the</h1>
    </div>
  );
}
