"use client";
import { Badge, Button, Input, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/components/context/delete-modal";
import {
  DroupdownActions,
  Pagination,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { useDebonunced } from "@/redux/hooks";
import { useState } from "react";
import { ShowToast } from "@/helpers";
import Link from "next/link";
import {
  useDeleteScheduleMutation,
  useGetAllScheduleQuery,
} from "@/redux/api/scheduleApi";


export default function Doctors() {
  const { confirm } = useConfirmation();
  const [search, setSearch] = useState<string>("");
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["search"] = search;
  const { data, isLoading } = useGetAllScheduleQuery({ ...query });
  const [deleteSchedule] = useDeleteScheduleMutation();

  const headers = ["Day", "Date", "Start Time", "End Time", "Status", "Action"];

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      const res = await deleteSchedule(id).unwrap();
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
      <ul className="flex justify-between items-center">
        <li>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Date hare..."
          ></Input>
        </li>
        <li>
          <Button>
            <Link href="/dashboard/admin/schedule/store">Add Schedule</Link>
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
                  <Badge variant={item.status == "BOOKED" ? "yes" : "no"}>
                    {item.status == "BOOKED" ? "Booked" : "UnBooked"}
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
