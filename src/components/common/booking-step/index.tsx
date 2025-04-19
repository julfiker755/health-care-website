import React, { useEffect } from "react";
import { Hospital, Blinds, Loader } from "lucide-react";
import Image from "next/image";
import assets from "@/assets";
import { Checkbox, Input, Label } from "@/components/ui";
import { FromInput, NoItemData } from "@/components/reusable";
import { appointmentProps } from "@/app/(common)/booking/[id]/page";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/shared/from";
import { childrenProps } from "@/app/(common)/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientProfileSchema } from "@/types";
import { useGetAllDoctorScheduleQuery } from "@/redux/api/scheduleApi";
import { useGetSingleAppointmentQuery } from "@/redux/api/appointmentApi";
import { formatDate } from "@/lib/utils";

interface AppointmentProps {
  appointment: appointmentProps;
  setIsAppointment: React.Dispatch<React.SetStateAction<appointmentProps>>;
  children: React.ReactNode;
}

export function Step1Appointment({
  appointment,
  setIsAppointment,
  children,
}: AppointmentProps) {
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
    // id:4
    //   img: "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/clinic-icon-01.svg",
    //   text: "AllCare Family Medicine",
    //   address: "3343 Private Lane",
    // },
    {
      id: "1",
      img: "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/clinic-icon-02.svg",
      text: "Vitalplus Clinic",
      address: "4223 Pleasant Hill Road",
    },
    {
      id: "2",
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
            onClick={() =>
              setIsAppointment((prev) => ({
                ...prev,
                appointmentType: item.type,
              }))
            }
            key={index}
            className={`border ${
              item?.type === appointment?.appointmentType &&
              "border-[#0088beee]"
            } py-3 rounded-md cursor-pointer`}
          >
            <h1 className="flex justify-center">
              {<item.icon size={20} className="text-gray-600" />}
            </h1>
            <h1 className="text-center">{item.text}</h1>
          </div>
        ))}
      </div>
      {appointment.appointmentType === "clinic" && (
        <div className="grid grid-cols-1 mt-3 lg:grid-cols-2 gap-3">
          {clinicItem.map((item, index) => (
            <div
              key={index}
              className={`border  rounded-md p-1 flex justify-between items-center`}
              onClick={() =>
                setIsAppointment((prev) => ({
                  ...prev,
                  clinicId: item.id,
                }))
              }
            >
              <div className="flex gap-1 cursor-pointer  items-center">
                <Image
                  src={item.img}
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
              <h1 className="pr-3">
                <Checkbox
                  checked={appointment.clinicId == item.id}
                  className="border-none data-[state=checked]:bg-[#0088beee] hover:border-none"
                />
              </h1>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">{children}</div>
    </div>
  );
}
// Step2Schedule
interface scheduleProps extends AppointmentProps {
  schedule: any;
}
export function Step2Schedule({
  schedule,
  appointment,
  setIsAppointment,
  children,
}: scheduleProps) {
  const { data: doctorSchedule, isLoading } = useGetAllDoctorScheduleQuery({});
  const currentSchedule = schedule?.filter((item: any) => {
    const matchingSchedule = doctorSchedule?.find(
      (schedule: any) => schedule?.scheduleId === item?.id
    );
    return matchingSchedule && !matchingSchedule?.isBooked;
  });
  return (
    <div>
      <h1 className="font-medium mb-2">Select Schedule</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {isLoading ? (
          <h1 className="py-10 col-span-3">
            {" "}
            <Loader size={23} className="animate-spin text-[#2762cf] m-auto" />
          </h1>
        ) : schedule?.length > 0 ? (
          currentSchedule?.map((item: any, index: any) => (
            <div
              key={index}
              className={`border py-2 transition-all text-center rounded-md cursor-pointer ${
                appointment.scheduleId == item.id && "border-[#0088beee]"
              }`}
              onClick={() =>
                setIsAppointment((prev) => ({
                  ...prev,
                  scheduleId: item.id,
                }))
              }
            >
              <h1 className="text-[15px]">{item.date}</h1>
              <h1 className="text-sm">{item.day}</h1>
              <h1 className="text-sm">
                {item?.startTime}-{item?.endTime}
              </h1>
            </div>
          ))
        ) : (
          <NoItemData title="Schedule Not Found" className="col-span-3 py-10" />
        )}
      </div>
      <div className="flex justify-between mt-4">{children}</div>
    </div>
  );
}

// Step2Information
interface InformationProps extends childrenProps {
  handleSubmit: (values: FieldValues) => void;
  user: any;
}
export function Step2Information({
  children,
  handleSubmit,
  user,
}: InformationProps) {
  const ProfileFrom = useForm({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      age: null,
      blood: "",
    },
  });

  useEffect(() => {
    ProfileFrom.reset({
      name: user?.name,
      email: user?.email,
      contactNumber: user?.contactNumber,
      address: user?.address,
      blood: user?.blood || "",
      age: user?.age?.toString() || "",
    });
  }, [user, ProfileFrom]);

  return (
    <div className="">
      <h1 className="font-medium mb-2">Patient Information</h1>
      <Form from={ProfileFrom} onSubmit={handleSubmit}>
        <div className="text-base grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FromInput
            readOnly={true}
            label="Name"
            name="name"
            placeholder="Enter your Name"
          ></FromInput>
          <FromInput
            readOnly={true}
            label="Email"
            name="email"
            placeholder="Enter your email"
          ></FromInput>
          <FromInput
            label="Age"
            name="age"
            type="number"
            placeholder="Enter your Age"
          ></FromInput>
          <FromInput
            label="Blood"
            name="blood"
            placeholder="Enter your blood"
          ></FromInput>
          <FromInput
            label="Contact Number"
            name="contactNumber"
            placeholder="Enter your Contact Number"
          ></FromInput>
          <FromInput
            label="Address"
            name="address"
            placeholder="Enter your address"
          ></FromInput>
          <div className="flex lg:col-span-2 justify-between mt-4">
            {children}
          </div>
        </div>
      </Form>
    </div>
  );
}
// Step3Payment
interface paymentProps extends childrenProps {
  appointmentId: string;
  price: number;
}

export function Step3Payment({ children, appointmentId, price }: paymentProps) {
  const { data } = useGetSingleAppointmentQuery(appointmentId);

  const gatewayItem = [
    {
      img: assets.payment.stripe,
      text: "Stripe",
    },
    {
      img: assets.payment.sslcommerz,
      text: "Sslcommerz",
    },
  ];

  return (
    <div>
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
              <li className="text-sm">
                {data?.schedule?.startTime}-{data?.schedule?.endTime}
                {","}
                {formatDate(data?.schedule?.date)}
              </li>
            </ul>
            <ul>
              <li className="text-sm font-medium">Appointment type</li>
              <li className="text-sm">
                {data?.appointmentType === "ONLINE" ? "Online" : "Clinic"}
              </li>
            </ul>
          </div>
          <div className="py-2">
            <hr />{" "}
          </div>
          <h1 className="font-medium mb-2">Payment Info</h1>
          <ul className="border-b mb-2">
            <li className="flex justify-between text-sm">
              <span>Booking Fee</span>
              <span>${price}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Tax</span>
              <span>$10</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Discount</span>
              <span>$10</span>
            </li>
          </ul>
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span>${price}</span>
          </div>
        </div>
      </div>
      <div className="flex lg:col-span-2 justify-between mt-4">{children}</div>
    </div>
  );
}
