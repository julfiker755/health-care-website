"use client";
import { Badge, Button,TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/components/context/delete-modal";
import {
  DroupdownActions,
  Pagination,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { useState } from "react";
import { ShowToast } from "@/helpers";
import Link from "next/link";
import { useDeleteDoctorScheduleMutation, useGetDoctorScheduleQuery } from "@/redux/api/doctorApi";


export default function Doctors() {
  const { confirm } = useConfirmation();
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const { data, isLoading } =  useGetDoctorScheduleQuery({...query})
  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

  const headers = ["Day", "Date", "Start Time", "End Time", "Booked", "Action"];

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      const res = await deleteDoctorSchedule(id).unwrap();
      if (res?.id) {
        ShowToast({
          type: "success",
          title: "Delete Successful",
          description: "You have schedule delete successfully",
        });
      }
    }
  };

  return (
    <div>
      <ul className="flex justify-end items-center">
        <li>
          <Button>
            <Link href="/dashboard/doctor/schedule/store">Add Schedule</Link>
          </Button>
        </li>
      </ul>
      <div>
        <Table
          title="All Schedule"
          description="Manage your Schedule and view their details"
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
          ) : !!data?.schedules?.length ? (
            data?.schedules?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
                <TableCell>
                  <Badge variant={item.isBooked == false ? "no" : "yes"}>
                    {item.isBooked == false ? "No" : "Yes"}
                  </Badge>
                </TableCell>
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
