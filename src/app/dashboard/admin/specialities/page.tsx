"use client";
import {
  DroupdownActions,
  Pagination,
  SheetDrawer,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { Button, Input, TableCell, TableRow } from "@/components/ui";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { useDebonunced } from "@/redux/hooks";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";


export default function Specialities() {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPage, setIsPage] = useState<number>(1)
  const query: Record<string, any> = {page: isPage};
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["search"] = search;
  const {data,isLoading } = useGetAllSpecialitiesQuery({
    ...query,
  });
  const headers = ["Scrial", "Icon", "Title", "createdAt", "Action"]


  const handleDelete = async (id: string) => {};


  return (
    <div>
      <ul className="flex justify-between items-center">
        <li>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Specialities"
          ></Input>
        </li>
        <li>
          <Button onClick={() => setIsOpen(!isOpen)}>Add Specialty</Button>
        </li>
      </ul>
      <div>
        <Table className="mt-8" headers={headers} 
         pagination={
           data?.meta?.total > data?.meta?.limit &&  <Pagination
            page={isPage}
            totalPage={data?.meta?.total}
            onPageChange={setIsPage}
            per_page={data?.meta?.limit}
          />
         }
        >
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} />
          ) : !!data?.specialities?.length ? (
            data?.specialities?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    className="w-full h-full"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.icon}`}
                    width={30}
                    height={100}
                    alt="image in picture"
                    style={{
                      width: "30px",
                    }}
                  ></Image>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "View",
                        to: `/admin/offer/view/${item?.id}`,
                      },
                      {
                        type: "button",
                        label: "Delete",
                        onClick: () => handleDelete(item.id),
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem colSpan={headers?.length} />
          )}
        </Table>
      </div>
      {/* Add Specialities */}
      <SheetDrawer
        title="Add Specialty"
        description="Please fill in the required information to add a new specialty"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <ul>
          <li>12334</li>
          <li>54545</li>
        </ul>
      </SheetDrawer>
    </div>
  );
}
