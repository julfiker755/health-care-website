"use client";
import {
  DroupdownActions,
  Pagination,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { useDeleteAdminMutation, useGetAllAdminQuery } from "@/redux/api/adminApi";
import {Button, Input, TableCell, TableRow } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { useDebonunced } from "@/redux/hooks";
import { useState } from "react";
import { ShowToast } from "@/helpers";
import  useConfirmation  from "@/components/context/delete-modal";
import Link from "next/link";

export default function Admin() {
  const { confirm } = useConfirmation();
  const [search, setSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["email"] = search;
  const {data,isLoading}= useGetAllAdminQuery({...query})
  const [deleteAdmin]=useDeleteAdminMutation()


  const headers = [
    "Name",
    "Email",
    "Contact",
    "Gender",
    "createdAt",
    "Action",
  ];

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      const res = await  deleteAdmin(id).unwrap();
      if (res?.id) {
        ShowToast({
          type: "success",
          title: "Delete Successful",
          description: "You have Admin delete successfully",
        });
      }
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
            <Link href="/dashboard/super-admin/admin/store">Add Admin</Link>
          </Button>
        </li>
      </ul>
      <div>
        <Table
          title="All Admin"
          description="Manage your admin and view their details"
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
          ) : !!data?.admins?.length ? (
            data?.admins?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.contactNumber}</TableCell>
                <TableCell>
                   {item.gender == "MALE" ? "Male" :"Female" }
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
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
