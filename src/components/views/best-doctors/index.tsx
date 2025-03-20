"use client";
import { IconStarFilled } from "@tabler/icons-react";
import { NoItemData, Title } from "@/components/reusable";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import { Zoom } from "@/components/animation";
import { PlaceholderImg } from "@/lib/utils";
import { Button, Skeleton } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "white",
  activeBoxColor: "#0e82fd",
  inactiveFillColor: "white",
  inactiveBoxColor: "#0e82fd7d",
};

export default function BestDoctors() {
  const { data, isLoading } = useGetAllDoctorQuery({});
  return (
    <div className="container pb-10 lg:pb-20">
      <Title
        className="pb-5"
        title="Best Doctor"
        text="Book online to connect with our trusted experts"
      ></Title>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className="border border-gray-100 rounded-md p-2">
              <div className="relative">
                <Skeleton className="w-full h-[150px]" />
              </div>
              <div className="py-1 flex justify-between">
                <Skeleton className="w-[120px] h-[18px]" />
                <Skeleton className="w-[60px] h-[18px]" />
              </div>
              <Skeleton className="w-[160px] h-[18px]" />
              <Skeleton className="w-[100px] mt-1 h-[15px]" />
              <Skeleton className="w-full mt-1 h-[4px]" />
              <div className="flex justify-between">
                <Skeleton className="w-[80px] mt-1 h-[20px]" />
                <Skeleton className="w-[80px] mt-1 h-[20px]" />
              </div>
            </div>
          ))
        ) : data?.doctors?.length > 0 ? (
          data?.doctors?.slice(0, 4)?.map((item: any) => (
            <Zoom key={item?.id} className="border rounded-md px-2 pt-2">
              <div className="relative">
                <Image
                  src={
                    item?.profilePhoto !== null
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.profilePhoto}`
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
              <div className="py-2">
                <ul className="flex justify-between pb-1">
                  <li>
                    <Rating
                      style={{ maxWidth: 115 }}
                      value={item?.averageRating}
                      itemStyles={myStyles}
                      spaceBetween="small"
                      halfFillMode="box"
                      readOnly
                    />
                  </li>
                  <li className="bg-[#8d2ee6] flex items-center gap-[2px] w-fit h-fit text-white px-2 text-sm rounded-[3px]">
                    {item?.averageRating}
                  </li>
                </ul>
                <ul>
                  <li className="text-lg font-medium">{item.name}</li>
                  <li className="text-gray-700 text-xs">
                    {item?.qualification}&nbsp;-&nbsp;
                    {item?.specialities[0]?.title || "Cardiology"}
                  </li>
                </ul>
                <hr className="my-[6px]" />
                <ul className="flex justify-between">
                  <li>
                    <Link href={`/doctors/${item.id}`} key={item.id}>
                      <Button
                        className="rounded-full bg-[#012047] hover:bg-[#012047]/90"
                        size="sm"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Button className="rounded-full" size="sm">
                      Book Now
                    </Button>
                  </li>
                </ul>
              </div>
            </Zoom>
          ))
        ) : (
          <div className="col-span-4">
            <NoItemData title="No Doctor Found" />
          </div>
        )}
      </div>
    </div>
  );
}
