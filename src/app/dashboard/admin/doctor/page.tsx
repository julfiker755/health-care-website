"use client";
import {
  DroupdownActions,
  Pagination,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { Badge, Button, Input, TableCell, TableRow } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { useDebonunced } from "@/redux/hooks";
import { useState } from "react";
import { ShowToast } from "@/helpers";
import { useConfirmation } from "@/components/common";
import { useGetAllDoctorQuery } from "@/redux/api/doctorApi";
import Link from "next/link";

export default function Doctors() {
  const { confirm } = useConfirmation();
  const [search, setSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["email"] = search;
  const { data, isLoading } = useGetAllDoctorQuery({ ...query });

  const headers = [
    "Scrial",
    "Name",
    "Email",
    "Contact",
    "Deactivate",
    "createdAt",
    "Action",
  ];

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      console.log(id);
      // const res = await deleteSpecialities(id).unwrap();
      // if (res?.id) {
      //   ShowToast({
      //     type: "success",
      //     title: "Delete Successful",
      //     description: "You have Specialities delete successfully",
      //   });
      // }
    }
  };

  return (
    <div>
      <ul className="flex justify-between items-center">
        <li>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Email hare"
          ></Input>
        </li>
        <li>
          <Button>
            <Link href="/dashboard/admin/doctor/store">Add Doctor</Link>
          </Button>
        </li>
      </ul>
      <div>
        <Table
          title="All Doctors"
          description="Manage your doctor and view their details"
          headers={headers}
          pagination={
            data?.meta?.total > data?.meta?.limit && (
              <Pagination
                page={isPage}
                totalPage={data?.meta?.total}
                onPageChange={setIsPage}
                per_page={data?.meta?.limit}
              />
            )
          }
        >
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} />
          ) : !!data?.doctors?.length ? (
            data?.doctors?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.contactNumber}</TableCell>
                <TableCell>
                  <Badge variant={item.isDeleted ? "yes" : "no"}>
                    {item.isDeleted ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "Edit",
                        to: `/dashboard/admin/doctor/edit/${item.id}`,
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
    </div>
  );
}
