"use client";
import AppointmentProfile from "@/components/common/appointment-profile";
import { useGetSingleAppointmentQuery } from "@/redux/api/appointmentApi";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import { useGetAllPaymentQuery } from "@/redux/api/paymentApi";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const session = searchParams.get("session_id");
  const router = useRouter();

  const query = useMemo(() => {
    return session ? { id: session } : {};
  }, [session]);

  const { data, isLoading, isError } = useGetAllPaymentQuery(query, {
    skip: !session,
  });

  useEffect(() => {
    if (data?.success == false) {
      router.push("/");
    }
  }, [data?.success]);

  const { appointmentId, doctorId, price } = data || {};
  const { data: doctorInfo } = useGetSingleDoctorQuery(doctorId);
  const { data: appInfo } = useGetSingleAppointmentQuery(appointmentId);
  return (
    <div className="p-3 rounded-md my-6 bg-[#f9f9f9] max-w-3xl m-auto">
      <AppointmentProfile {...doctorInfo} />
      <div className="flex gap-5 pb-2 bg-white mt-3 p-3 rounded-md">
        <div className="w-full">
          <h1 className="flex gap-[2px] border-b pb-1 items-center">
            {" "}
            <IconCircleCheckFilled className="text-blue-600" size={21} />
            Booking ConfiIrmed
          </h1>
          <h1 className="text-sm text-gray-500 py-4">
            Your Booking has been Confirmed with {doctorInfo?.name} Brown be on
            time before 30 Mins From the appointment Time
          </h1>
          <div>
            <h1 className="font-semibold mb-2">Booking Info</h1>
            <ul className="grid  grid-cols-1 lg:grid-cols-2 gap-6">
              <li>
                <h1 className="font-medium">Appointment type</h1>
                <h3 className="text-gray-500 text-sm">
                  {appInfo?.appointmentType === "ONLINE" ? "Online" : "Clinic"}
                </h3>
              </li>
              <li>
                <h1 className="font-medium">Additional Service</h1>
                <h3 className="text-gray-500 text-sm">
                  {(!!doctorInfo?.specialities &&
                    doctorInfo?.specialities[0]?.name) ||
                    "Cardiology"}
                </h3>
              </li>
              <li>
                <h1 className="font-medium">Date & Time</h1>
                <h3 className="text-gray-500 text-sm">
                  {appInfo?.schedule?.startTime}-{appInfo?.schedule?.endTime}
                  {","}
                  {formatDate(appInfo?.schedule?.date)}
                </h3>
              </li>
              <li>
                <h1 className="font-medium">Payment Status</h1>
                <h3 className="text-gray-500 text-sm">Paid</h3>
              </li>
              <li>
                <h1 className="font-medium">Clinic Name & Location</h1>
                <h3 className="text-gray-500 text-sm">
                  Wellness Path View Location
                </h3>
              </li>
              <li className="flex items-center">
                <Link href="/dashboard/patient/appointment">
                  <h1 className="text-xs px-1 py-[2px] border border-blue-600/80 rounded-full text-blue-600/80">
                    See Appointment
                  </h1>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:block w-[350px] m-auto justify-center">
          <div>
            <Image
              src={
                "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/payment-qr.svg"
              }
              alt="item"
              width={140}
              height={100}
              className="rounded-sm m-auto"
            ></Image>
            <h1 className="text-center text-gray-500 text-sm">
              Scan this QR Code to Download the details of Appointment
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
