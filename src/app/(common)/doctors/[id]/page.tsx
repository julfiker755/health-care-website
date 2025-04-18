"use client";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import { Breadcrumb, NoItemData, RatingScore } from "@/components/reusable";
import { useGetAllDoctorScheduleQuery } from "@/redux/api/scheduleApi";
import { PlaceholderImg } from "@/lib/utils";
import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Video,
  CalendarDays,
  Target,
  Bookmark,
} from "lucide-react";
import assets from "@/assets";

export interface ParamsProps {
  params: {
    id: string;
  };
}

export default function Doctor({ params: { id } }: ParamsProps) {
  const { data } = useGetSingleDoctorQuery(id);
  const { data: doctorSchedule } = useGetAllDoctorScheduleQuery({});

  const currentData = data?.schedule?.filter((item: any) => {
    const matchingSchedule = doctorSchedule?.find(
      (schedule: any) => schedule?.scheduleId === item?.id
    );
    return matchingSchedule && !matchingSchedule?.isBooked;
  });

  const clinicItem = [
    assets.clinic.clinic1,
    assets.clinic.clinic2,
    assets.clinic.clinic3,
    assets.clinic.clinic4,
  ];
  return (
    <div>
      <Breadcrumb>
        <h1 className="text-xl lg:text-3xl font-bold">Doctor Profile</h1>
        <h2 className="text-sm">
          <Link href={"/doctors"}>Doctors</Link> / Doctor Profile
        </h2>
      </Breadcrumb>
      <div className="container">
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
                <Button
                  className="bg-[#f1f5f9] text-black hover:bg-[#E6E8EE]"
                  size={"sm"}
                >
                  <h1 className="flex items-center gap-x-1">
                    <MessageCircle />
                    <span>Chat</span>
                  </h1>
                </Button>
                <Button
                  size={"sm"}
                  className="bg-[#f1f5f9] text-black hover:bg-[#E6E8EE]"
                >
                  <h1 className="flex items-center gap-x-1">
                    <Phone />
                    <span>Audio</span>
                  </h1>
                </Button>
                <Button
                  size={"sm"}
                  className="bg-[#f1f5f9] text-black hover:bg-[#E6E8EE]"
                >
                  <h1 className="flex items-center gap-x-1">
                    <Video />
                    <span>Video</span>
                  </h1>
                </Button>
              </li>
            </ul>
          </div>
          {/* fff */}
          <hr className="my-3" />
          <ul className="flex justify-between flex-wrap space-y-2 lg:space-y-0  m-auto items-center">
            <li className="flex gap-1 items-center">
              <CalendarDays
                size={26}
                className="bg-[#0092e4] text-white p-1 rounded-md"
              />
              200+ Appointment Booked
            </li>
            <li className="flex gap-1 items-center">
              <Target
                size={26}
                className="bg-[#0092e4] text-white p-1 rounded-md"
              />
              In Practice for 21 Years
            </li>
            <li className="flex gap-1 items-center">
              <Bookmark
                size={26}
                className="bg-[#0092e4] text-white p-1 rounded-md"
              />
              15+ Awards
            </li>
            <li>
              <Link href={`/booking/${data?.id}`}>
                <Button className="rounded-full" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="space-y-4 py-5">
          <div>
            <h1 className="font-medium text-xl mb-2">Speciality</h1>
            <div className="flex flex-wrap space-x-3">
              {data?.specialities.map((item: any, index: any) => (
                <h1
                  key={index}
                  className="bg-[#f8fafc] py-1 px-3 border rounded-lg"
                >
                  {item.title}
                </h1>
              ))}
            </div>
            <hr className="my-4" />
          </div>
          {/* schedule */}
          <div>
            <h1 className="font-medium text-xl mb-2">Availability</h1>
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
            <hr className="my-4" />
          </div>
          <div>
            <h1 className="font-medium text-xl mb-2">Clinics & Locations</h1>
            <div className="space-y-3">
              {/*  {/* clinic 1 */}
              <div className="border p-3 rounded-md">
                <div className="flex flex-wrap justify-between">
                  <div>
                    <ul>
                      <li className="font-medium">
                        The Family Dentistry Clinic
                      </li>
                      <li className="text-sm text-gray-500">
                        2286 Sundown Lane, Old Trafford 24541, UK
                      </li>
                      <li className="flex items-center gap-x-1">
                        <RatingScore value={6} />
                        (6)
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-3 lg:gap-0 lg:space-x-5 mt-4">
                      {clinicItem?.map((item, index) => (
                        <Image
                          key={index}
                          src={item}
                          alt="77"
                          className="relative rounded-md"
                          width={80}
                          height={100}
                        ></Image>
                      ))}
                    </div>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28708.289865865278!2d88.7301481!3d25.91761205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1703139500291!5m2!1sen!2sbd"
                    className="w-[280px] m-auto mt-2 lg:mt-0 lg:mr-0 rounded-md lg:w-[400px] h-[200px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              {/* clinic 2 */}
              <div className="border p-3 rounded-md">
                <div className="flex flex-wrap justify-between">
                  <div>
                    <ul>
                      <li className="font-medium">
                        Smile Cute Dental Care Center
                      </li>
                      <li className="text-sm text-gray-500">
                        MDS - Periodontology and Oral Implantology, BDS
                      </li>
                      <li className="flex items-center gap-x-1">
                        <RatingScore value={5} />
                        (6)
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-3 lg:gap-0 lg:space-x-5 mt-4">
                      {clinicItem?.map((item, index) => (
                        <Image
                          key={index}
                          src={item}
                          alt="77"
                          className="relative rounded-md"
                          width={80}
                          height={100}
                        ></Image>
                      ))}
                    </div>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28708.289865865278!2d88.7301481!3d25.91761205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1703139500291!5m2!1sen!2sbd"
                    className="w-[280px] m-auto mt-2 lg:mt-0 lg:mr-0 rounded-md lg:w-[400px] h-[200px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <hr className="my-4" />
          </div>
          <div>
            <h1 className="font-medium text-xl mb-2">Reviews (200)</h1>
            <div className="border p-3 rounded-md">
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-2">
                  <Image
                    src={assets.blog.ProImg1}
                    alt={"ff"}
                    fill
                    className="object-cover"
                  />
                </div>
                <ul>
                  <li className="font-medium">Dane jose</li>
                  <li className="flex items-center text-sm">
                    <RatingScore width={90} value={5} />
                    <span>| 1 Months ago</span>{" "}
                  </li>
                </ul>
              </div>
              <p className="text-sm lg:text-base pt-3 text-gray-700">
                Thank you for this informative article! I've had a couple of
                hit-and-miss experiences with freelancers in the past, and I
                realize now that I wasn't vetting them properly. Your checklist
                for choosing the right freelancer is going to be my go-to from
                now on
              </p>
            </div>
            {/* review exit box */}
            {/* <div className="border mt-3 p-3 rounded-md">
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-2">
                  <Image
                    src={assets.blog.ProImg1}
                    alt={"ff"}
                    fill
                    className="object-cover"
                  />
                </div>
                <ul>
                  <li className="font-medium">Dane jose</li>
                  <li className="flex items-center text-sm">
                    <RatingScore width={90} value={5} />
                    <span></span>{" "}
                  </li>
                </ul>
              </div>
              <Textarea
                className="mt-3"
                placeholder="Enter Your Review hare"
              ></Textarea>
              <div className="flex gap-x-2 mt-3">
                <Button>Submit</Button>
                <Button variant={"danger"}>Reset</Button>
              </div>
            </div> */}
          </div>
        </div>
        <h1 className="pb-10"></h1>
      </div>
    </div>
  );
}
