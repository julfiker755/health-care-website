"use client";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import { MessageCircle, Phone, Video } from "lucide-react";
import { NoItemData } from "@/components/reusable";
import useConfirmation from "@/components/context/delete-modal";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";
import { useGetAllDoctorScheduleQuery } from "@/redux/api/scheduleApi";
import useAuth from "@/components/context/auth-info";
import { PlaceholderImg } from "@/lib/utils";
import { Button } from "@/components/ui";
import { ShowToast } from "@/helpers";
import Image from "next/image";
import Link from "next/link";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function Doctor({ params: { id } }: ParamsProps) {
  const { authInfo } = useAuth();
  const { confirm } = useConfirmation();
  const { data } = useGetSingleDoctorQuery(id);
  const [createAppointment] = useCreateAppointmentMutation();
  const { data: doctorSchedule } = useGetAllDoctorScheduleQuery({});

  const hanldeAppointment = async (schedule_id: string) => {
    if (authInfo == null) {
      ShowToast({
        type: "error",
        title: "Permission Denied",
        description: "Please log in to continue to the next step.",
      });
      return;
    }
    const confirmed = await confirm({
      title: "Confirm Appointment",
      description:
        "Are you sure you want to schedule this appointment? This action cannot be undone.",
      confirmText: "Yes, Schedule",
    });
    const scheduleData = {
      doctorId: id,
      scheduleId: schedule_id,
    };

    if (confirmed) {
      const res = await createAppointment(scheduleData).unwrap();
      if (res?.data?.id) {
        ShowToast({
          type: "success",
          title: "Store Successful",
          description: "You have Appointment Store successfully",
        });
      }
    }
  };
  const currentData = data?.schedule?.filter((item: any) => {
    const matchingSchedule = doctorSchedule?.find(
      (schedule: any) => schedule?.scheduleId === item?.id
    );
    return matchingSchedule && !matchingSchedule?.isBooked;
  });

  return (
    <div>
      <div className="text-center py-12">
        <h1 className="text-xl lg:text-3xl font-bold">Doctor Profile</h1>
        <h2 className="text-sm">
          <Link href={"/doctors"}>Doctors</Link> / Doctor Profile
        </h2>
      </div>
      <div className="container space-y-5">
        <div className="border rounded-md p-3">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="w-full lg:w-[230px]">
                <Image
                  src={
                    data?.profilePhoto !== null
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.profilePhoto}`
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
              <ul className="space-y-1">
                <li>{data?.name}</li>
                <li className="text-sm">Speaks : English,Bangla</li>
                <li className="text-sm">
                  Qualification: {data?.qualification}
                </li>
                <li className="text-sm">Designation: {data?.designation} </li>
                <li className="text-sm">Experience: {data?.experience} </li>
                <li className="text-sm">Price: {data?.appointmentFee} </li>
                <li className="text-sm">
                  <h1 className="border-transparent w-fit px-2 rounded-md text-sm bg-green-600 text-white">
                    {data?.gender === "MALE" ? "Male" : "Female"}
                  </h1>
                </li>
              </ul>
            </div>
            <ul className="text-sm space-y-1">
              <li>Address: {data?.address}</li>
              <li>Current Address: {data?.currentWorkingPlace}</li>
              <li>Contact: {data?.contactNumber}</li>
              <li>Rating: {data?.averageRating}</li>
              <li>94% Recommended</li>
              <li>Accepting New Patients</li>
              <li className="flex gap-x-2 items-center nt-2">
                <Button size={"sm"}>
                  <h1 className="flex items-center gap-x-1">
                    <MessageCircle />
                    <span>Chat</span>
                  </h1>
                </Button>
                <Button size={"sm"}>
                  <h1 className="flex items-center gap-x-1">
                    <Phone />
                    <span>Audio</span>
                  </h1>
                </Button>
                <Button size={"sm"}>
                  <h1 className="flex items-center gap-x-1">
                    <Video />
                    <span>Video</span>
                  </h1>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        {/* schedule */}
        <h1 className="font-medium text-xl">Appointment Schedule</h1>
        <div className="border rounded-md p-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {data?.schedule?.length > 0 ? (
              currentData.map((item: any, index: any) => (
                <div
                  onClick={() => hanldeAppointment(item.id)}
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
        <h1 className="pb-10"></h1>
      </div>
    </div>
  );
}
