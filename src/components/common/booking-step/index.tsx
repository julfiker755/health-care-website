"use client";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import React from "react";

export function Step1Appointment() {
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border p-2 rounded-md">
        <h1 className="font-medium mb-2">Payment Gateway</h1>
        <div></div>
      </div>
      <div className="border p-2 rounded-md">
        <h1 className="font-medium mb-2">Booking Info</h1>
        <ul className="border-b">
          <li className="text-sm font-medium">Date & Time</li>
          <li className="text-sm">10:00 - 11:00 AM, 15, Oct 2025</li>
        </ul>
      </div>
    </div>
  );
}
