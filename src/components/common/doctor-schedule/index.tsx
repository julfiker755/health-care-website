"use client";
import { NoItemData } from "@/components/reusable";
import { useGetAllDoctorScheduleQuery } from "@/redux/api/scheduleApi";
import React from "react";

export default function DoctorSchedule({ data }: { data: any }) {
  const { data: doctorSchedule } = useGetAllDoctorScheduleQuery({});

  const currentData = data?.schedule?.filter((item: any) => {
    const matchingSchedule = doctorSchedule?.find(
      (schedule: any) => schedule?.scheduleId === item?.id
    );
    return matchingSchedule && !matchingSchedule?.isBooked;
  });
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {data?.schedule?.length > 0 ? (
          currentData.map((item: any, index: any) => (
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
          ))
        ) : (
          <div className="col-span-4">
            <NoItemData className="py-11" title="No schedule Found" />
          </div>
        )}
      </div>
    </div>
  );
}
