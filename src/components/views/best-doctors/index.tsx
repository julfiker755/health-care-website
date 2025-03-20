"use client";
import { NoItemData, Title } from "@/components/reusable";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import { Zoom } from "@/components/animation";
import { SmallDocCard, SmallDocSkeleton } from "@/components/reusable/card";
import React from "react";

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
          <SmallDocSkeleton />
        ) : data?.doctors?.length > 0 ? (
          data?.doctors?.slice(0, 4)?.map((item: any) => (
            <Zoom key={item?.id}>
              <SmallDocCard item={item} />
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
