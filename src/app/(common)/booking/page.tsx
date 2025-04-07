"use client";
import AppointmentProfile from "@/components/common/appointment-profile";
import {
  Step1Appointment,
  Step2Information,
  Step3Payment,
} from "@/components/common/booking-step";
import { Button } from "@/components/ui";
import React, { useState } from "react";

const StepProgress = () => {
  return (
    <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
      <li className="flex w-full relative text-indigo-600 after:content-[''] after:w-full after:h-0.5 after:bg-[red] after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="block whitespace-nowrap z-10">
          <span className="w-6 h-6 bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10">
            1
          </span>{" "}
          Appointment
        </div>
      </li>
      <li className="flex w-full relative text-gray-900 after:content-[''] after:w-full after:h-0.5 after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="block whitespace-nowrap z-10">
          <span className="w-6 h-6 bg-indigo-50 border-2 border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
            2
          </span>{" "}
          Information
        </div>
      </li>
      <li className="flex w-full relative text-gray-900 after:content-[''] after:w-full after:h-0.5 after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="block whitespace-nowrap z-10">
          <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10">
            3
          </span>{" "}
          Payment
        </div>
      </li>
      <li className="flex w-full relative text-gray-900  ">
        <div className="block whitespace-nowrap z-10">
          <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-10 lg:h-10">
            5
          </span>{" "}
          Confirmation
        </div>
      </li>
    </ol>
  );
};

export default function Booking() {
  const [isNext, setIsNext] = useState("appointment");
  return (
    <div className="py-12 max-w-3xl m-auto">
      <div className="">
        <StepProgress />
      </div>
      <div className="bg-[#f9f9f9] p-4 rounded-md">
        <AppointmentProfile />
        <div className="bg-white my-3 px-3 py-2 rounded-md">
          {isNext === "appointment" && <Step1Appointment />}
          {isNext === "information" && <Step2Information />}
          {/* {isNext === "information" && <Step3Payment />} */}

          <div className="flex justify-between mt-4">
            <Button>Back</Button>
            <Button onClick={() => setIsNext("information")}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
