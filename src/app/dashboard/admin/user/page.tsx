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
import Link from "next/link";
import { useGetAllUserQuery } from "@/redux/api/authApi";
import { RoleName } from "@/components/common/access-auth";

export default function User() {
  const [search, setSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["search"] = search;
  const { data, isLoading } = useGetAllUserQuery({ ...query });

  const headers = ["Email", "Role", "Status", "createdAt", "Action"];


  return (
    <div>
      <ul className="flex justify-between items-center">
        <li>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hare"
          ></Input>
        </li>
      </ul>
      <div>
        <Table
          title="All User"
          description="Manage your user and view their details"
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
          ) : !!data?.users?.length ? (
            data?.users?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{RoleName(item.role)}</TableCell>
                <TableCell>
                  <Badge variant={item?.status?.toLowerCase()}>
                    {item?.status == "ACTIVE"
                      ? "Active"
                      : item?.status == "BLOCKED"
                      ? "Blocked"
                      : "Deleted"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "Details",
                        to:`/dashboard/super-admin/user/${item.id}`,
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
