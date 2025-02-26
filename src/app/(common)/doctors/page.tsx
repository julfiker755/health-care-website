"use client";
import { AlignJustify, LayoutDashboard, Calendar } from "lucide-react";
import { NoItemData, Pagination } from "@/components/reusable";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import FilterSec from "@/components/common/filter-sec";
import { IconStarFilled } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDebonunced } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { formatDate, PlaceholderImg } from "@/lib/utils";
import { Input, Skeleton } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function Doctors() {
  const router = useRouter();
  const [isFilter, setIsFilter] = useState<any>({});
  const [isSearch, setIsSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage, limit: 6 };
  const debouncedTerm = useDebonunced({ searchQuery: isSearch, delay: 600 });
  if (!!debouncedTerm) query["search"] = isSearch;
  if (isFilter?.title && isFilter?.value) {
    query[isFilter.title.toLowerCase()] = isFilter.value;
  }
  const { data, isLoading } = useGetAllDoctorQuery({ ...query });

  useEffect(() => {
    if (isFilter?.title) {
      router.refresh();
    }
  }, [isFilter?.title, router]);

  return (
    <div>
      <div className="text-center py-14">
        <h1 className="text-xl lg:text-3xl font-bold">Search Doctors</h1>
        <h2 className="text-sm">
          <Link href={"/"}>Home</Link> / Search Doctors
        </h2>
      </div>
      <div className="container grid grid-cols-1 lg:grid-cols-8 gap-5 pb-12">
        <div className="border p-3 rounded-md lg:col-span-2">
          <h1 className="text-lg font-medium py-1">Filter</h1>
          <FilterSec setIsFilter={setIsFilter} />
        </div>
        <div className="lg:col-span-6 rounded-md">
          <div className="flex justify-between">
            <Input
              onChange={(e) => setIsSearch(e.target.value)}
              className="w-fit"
              placeholder="Doctors Search hare"
            ></Input>
            <ul className="flex items-center gap-2">
              <li className="flex items-center gap-[2px] text-muted-foreground">
                <h1 className="border w-fit p-[2px] rounded-sm">
                  <Calendar size={19} />
                </h1>
                {formatDate(new Date())}
              </li>
              <li className="text-muted-foreground border w-fit p-[2px] rounded-sm">
                <AlignJustify size={20} />
              </li>
              <li className="bg-[#0087BE] text-white  text-muted-foreground border w-fit p-[2px] rounded-sm">
                <LayoutDashboard size={20} />
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <div key={index} className="border border-gray-100 rounded-md p-2">
                    <div className="relative">
                      <Skeleton className="w-full h-[180px]" />
                    </div>
                    <div className="py-2 flex justify-between">
                      <Skeleton className="w-[120px] h-[20]" />
                      <Skeleton className="w-[80px] h-[20px]" />
                    </div>
                    <Skeleton className="w-[120px] h-[20px]" />
                  </div>
                ))
              ) : data?.doctors?.length > 0 ? (
                data?.doctors?.map((item: any) => (
                  <Link href={`/doctors/${item.id}`} key={item.id}>
                    <div className="border rounded-md p-2">
                      <div className="relative">
                        <Image
                          src={
                            item.profilePhoto !== null
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
                      <div className="py-2 flex justify-between">
                        <ul>
                          <li className="text-lg font-medium">{item.name}</li>
                          <li className="text-gray-600 text-sm">
                            {item.qualification}
                          </li>
                        </ul>
                        <div className="bg-[#1C5B91] flex items-center gap-[2px] w-fit h-fit text-white px-2 rounded-md text-sm">
                          <IconStarFilled size={16} />
                          {item.averageRating}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3">
                  <NoItemData title="No Doctor Found" />
                </div>
              )}
            </div>
            {/* pagination format */}
            <div className="flex justify-end mt-4">
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
      </div>
    </div>
  );
}
