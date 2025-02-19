"use client";
import { TimeSelector } from "@/components/common/time-selector";
import { DashTitle } from "@/components/reusable/dash-title";
import { Button, Calendar } from "@/components/ui";
import { DateRange } from "react-day-picker";
import React, { useState } from "react";
import { ShowToast } from "@/helpers";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { delay } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CreateSchedule() {
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [startTime, setStartTime] = useState({
    hour: 1,
    minute: 0,
    ampm: "AM",
  });
  const [endTime, setEndTime] = useState({ hour: 1, minute: 0, ampm: "PM" });
  const [duration, setDuration] = useState<any>(30);
  const router = useRouter();
  const handleTimeChange = (setter: any) => (type: any, value: any) =>
    setter((prev: any) => ({ ...prev, [type]: value }));

  const startDate1 = date?.from?.toISOString()?.split("T")[0];
  const endDate1 = date?.to
    ? date?.to?.toISOString()?.split("T")[0]
    : new Date()?.toISOString()?.split("T")[0];
  const starTime1 = `${startTime.hour}.${startTime.minute}${startTime.ampm}`;
  const endTime1 = `${endTime.hour}.${endTime.minute}${endTime.ampm}`;

  const handleSubmit = async () => {
    const data = {
      startDate: startDate1,
      endDate: endDate1,
      startTime: starTime1,
      endTime: endTime1,
      duration: parseInt(duration),
    };
   
    const res = await createSchedule(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Store Successful",
        description: "You have schedule Store successfully",
      });
      await delay(4000);
      router.refresh()
      router.push("/dashboard/admin/schedule");
    }
  };

  return (
    <div>
      <DashTitle
        className="mb-5"
        title="Add Schedule"
        description="Add and manage detailed schedule profiles efficiently"
      />
      <div className="overflow-hidden w-fit">
        <div className="flex  flex-col lg:flex-row gap-5 lg:h-[310px]">
          <div>
            <h1 className="mb-2">Date</h1>
            <Calendar
              className="border w-full lg:w-fit rounded-md"
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              disabled={(date: Date) =>
                date.getTime() < new Date().setHours(0, 0, 0, 0)
              }
            />
          </div>
          <TimeSelector
            label="Start Time"
            time={startTime}
            onChange={handleTimeChange(setStartTime)}
          />
          <TimeSelector
            label="End Time"
            time={endTime}
            onChange={handleTimeChange(setEndTime)}
          />
          <div>
            <h1 className="mb-2">Duration</h1>
            <ul className="border rounded-md px-2 flex lg:flex-col items-center  h-full">
              {[30, 60].map((t, idx) => (
                <li key={idx}>
                  <Button
                    size="icon"
                    variant={duration == t ? "default" : "ghost"}
                    className="sm:w-full my-1  aspect-square"
                    onClick={() => setDuration(t)}
                  >
                    {t}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Button disabled={isLoading} onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
