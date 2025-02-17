"use client";
import {
  DroupdownActions,
  Pagination,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { Input, TableCell, TableRow } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { useDebonunced } from "@/redux/hooks";
import { useState } from "react";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";

export default function User() {
  const [search, setSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["email"] = search;
  const { data, isLoading } = useGetAllPatientQuery({ ...query });
  const headers = ["Name", "Email", "Contact", "Gender", "createdAt", "Action"];

  return (
    <div>
      <ul className="flex justify-between items-center">
        <li>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Email hare"
          ></Input>
        </li>
      </ul>
      <div>
        <Table
          title="All Patient"
          description="Manage your patient and view their details"
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
          ) : !!data?.patients?.length ? (
            data?.patients?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.contactNumber}</TableCell>
                <TableCell>
                  {item.gender === "MALE" ? "Male" : "Female"}
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "Details",
                        to: `/dashboard/admin/patient/${item.id}`,
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
