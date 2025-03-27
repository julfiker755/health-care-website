"use client";
import { AlignJustify, LayoutDashboard, Calendar } from "lucide-react";
import { Breadcrumb, NoItemData, Pagination } from "@/components/reusable";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import {
  BigDocCard,
  SmallDocCard,
  SmallDocSkeleton,
} from "@/components/reusable/card";
import FilterSec from "@/components/common/filter-sec";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui";
import { useDebonunced } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function Doctors() {
  const router = useRouter();
  const [isShow, setIsShow] = useState("small");
  const [isFilter, setIsFilter] = useState<any>({});
  const [isSearch, setIsSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const isLimit = isShow === "small" ? 6 : 4;
  const query: Record<string, any> = { page: isPage, limit: isLimit };
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

  // MediaQuery to avoid infinite re-renders
  // const isSmallScreen = useMediaQuery({ query: "(max-width:640px)" });
  // useEffect(() => {
  //   if (isSmallScreen) setIsShow("small");
  //   else setIsShow("big");
  // }, [isSmallScreen]);

  return (
    <div>
      <Breadcrumb>
        <h1 className="text-xl lg:text-3xl font-bold">Doctor List</h1>
        <h2 className="text-sm">
          <Link href={"/"}>Home</Link> / Doctor List
        </h2>
      </Breadcrumb>
      <div className="container grid grid-cols-1 lg:grid-cols-8 gap-5 pb-12">
        <div className="border p-3 h-[calc(100%-58px)] rounded-md lg:col-span-2">
          <h1 className="text-lg font-medium py-1">Filter</h1>
          <div>
            <Input
              onChange={(e) => setIsSearch(e.target.value)}
              className="w-full mb-2"
              placeholder="Search hare.."
            ></Input>
            <FilterSec setIsFilter={setIsFilter} />
          </div>
        </div>
        <div className="lg:col-span-6 rounded-md">
          <div className="flex  justify-between">
            <h1 className="text-xl font-medium">
              Showing {data?.meta?.total || 0} Doctors For You
            </h1>
            <ul className="hidden lg:flex items-center gap-2">
              <li className="flex items-center gap-[2px] text-muted-foreground">
                <h1 className="border w-fit p-[5px] rounded-sm">
                  <Calendar size={18} />
                </h1>
                {formatDate(new Date())}
              </li>
              <li
                onClick={() => setIsShow("big")}
                className={`${
                  isShow === "big" && "bg-[#0087BE] !text-white"
                } text-black  text-muted-foreground border w-fit p-[5px] rounded-sm cursor-pointer`}
              >
                <AlignJustify size={18} />
              </li>
              <li
                onClick={() => setIsShow("small")}
                className={`${
                  isShow === "small" && "bg-[#0087BE] !text-white"
                } text-black text-muted-foreground border w-fit p-[5px] rounded-sm cursor-pointer`}
              >
                <LayoutDashboard size={18} />
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <div
              className={`grid grid-cols-1 ${
                isShow === "small" && "lg:grid-cols-3"
              }  gap-4`}
            >
              {isLoading ? (
                <SmallDocSkeleton />
              ) : data?.doctors?.length > 0 ? (
                data?.doctors?.map((item: any) =>
                  isShow === "big" ? (
                    <BigDocCard key={item.id} item={item} />
                  ) : (
                    <SmallDocCard key={item.id} item={item} />
                  )
                )
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
