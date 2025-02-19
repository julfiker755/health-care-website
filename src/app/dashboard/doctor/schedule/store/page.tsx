"use client";
import { NoItemData, Pagination } from "@/components/reusable";
import { DashTitle } from "@/components/reusable/dash-title";
import { Button, Skeleton } from "@/components/ui";
import { ShowToast } from "@/helpers";
import { delay } from "@/lib/utils";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorApi";
import { useGetAllScheduleQuery } from "@/redux/api/scheduleApi";
import React, { useState } from "react";

export default function StoreSchedule() {
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = {
    page: isPage,
    limit: 24,
    status: "unbooked",
  };
  const { data, isLoading } = useGetAllScheduleQuery({ ...query });
  const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
  const [createDoctorSchedule,{isLoading:createLoading}]=useCreateDoctorScheduleMutation()

  const handleSelectSchedule = (id: number) => {
    setSelectedSchedules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // handleSubmit
  const handleSubmit =async () => {
    const schedule = {
      scheduleId: selectedSchedules,
    };
    const res = await createDoctorSchedule(schedule).unwrap();
    if (res[0]?.id) {
      ShowToast({
        type: "success",
        title: "Store Successful",
        description: "You have schedule Store successfully",
      });
    }
    await delay(4000)
    setSelectedSchedules([])
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashTitle
          className="mb-5"
          title="Add Schedule"
          description="Add and manage detailed schedule profiles efficiently"
        />
        <div className="flex gap-x-2 items-center">
          <Button disabled={createLoading} onClick={handleSubmit}>Submit</Button>
          <Button onClick={() => setSelectedSchedules([])} variant={"danger"}>
            Reset
          </Button>
        </div>
      </div>
      <div>
        <div className="grid  grid-cols-1 gap-3 lg:grid-cols-6">
          {isLoading ? (
            [...Array(24)].map((_, index) => (
              <div
                key={index}
                className="border space-y-2 py-2 text-center rounded-md"
              >
                <Skeleton className="w-[120px] h-[13px] m-auto rounded-sm" />
                <Skeleton className="w-[80px] h-[13px] m-auto rounded-sm" />
                <Skeleton className="w-[140px] h-[13px] m-auto rounded-sm" />
              </div>
            ))
          ) : data?.schedules?.length > 0 ? (
            data?.schedules.map((item: any, index: any) => (
              <div
                onClick={() => handleSelectSchedule(item.id)}
                key={index}
                className={`border py-2 transition-all text-center rounded-md cursor-pointer ${
                  selectedSchedules.includes(item.id)
                    ? "border-[#0088beee]"
                    : "hover:border-[#0088beee]"
                }`}
              >
                <h1 className="text-[15px]">{item.date}</h1>
                <h1 className="text-sm">{item.day}</h1>
                <h1 className="text-sm">
                  {item.startTime}-{item.endTime}
                </h1>
              </div>
            ))
          ) : (
            <div className="col-span-6">
              <NoItemData title="No Doctor Found" />
            </div>
          )}
        </div>
        {/* pagination */}
        <div className="mt-5 flex justify-end">
          {data?.meta?.total > data?.meta?.limit && (
            <Pagination
              page={isPage}
              totalPage={data?.meta?.total}
              onPageChange={setIsPage}
              per_page={data?.meta?.limit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
