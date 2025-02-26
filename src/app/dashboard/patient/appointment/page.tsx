"use client";
import { Badge,TableCell, TableRow } from "@/components/ui";
import {
  DroupdownActions,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { useGetMyAppointmentQuery } from "@/redux/api/appointmentApi";


export default function Appointment() {
const {data,isLoading}= useGetMyAppointmentQuery({})
const headers = ["Day", "Date", "Start Time", "End Time", "Status", "Action"];

  return (
    <div>
      <div>
        <Table
          title="My Appointment"
          description="Manage your appointment and view their details"
          headers={headers}
        >
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} />
          ) : !!data?.length ? (
            data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.schedule.day}</TableCell>
                <TableCell>{item.schedule.date}</TableCell>
                <TableCell>{item.schedule.startTime}</TableCell>
                <TableCell>{item.schedule.endTime}</TableCell>
                <TableCell>
                  <Badge variant={"yes"}>
                     Active
                  </Badge>
                </TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "View",
                        to:`/dashboard/patient/appointment/${item.id}`,
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
