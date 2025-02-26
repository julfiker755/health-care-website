"use client";
import { Badge,TableCell, TableRow } from "@/components/ui";
import {
  DroupdownActions,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { useGetDoctorAppointmentQuery} from "@/redux/api/appointmentApi";


export default function Appointment() {
const {data,isLoading}=  useGetDoctorAppointmentQuery({})
const headers = ["Day", "Date", "Start Time", "End Time", "Status", "Action"];

  return (
    <div>
      <div>
        <Table
          title="Patient Appointment"
          description="Manage your appointment and view their details"
          headers={headers}
        >
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} />
          ) : !!data?.length ? (
            data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.appointment.schedule.day}</TableCell>
                <TableCell>{item.appointment.schedule.date}</TableCell>
                <TableCell>{item.appointment.schedule.startTime}</TableCell>
                <TableCell>{item.appointment.schedule.endTime}</TableCell>
                <TableCell>
                  <Badge variant={item.isBooked == true ? "yes":"no"}>
                      {item.isBooked == true ? "Paid":"UnPaid"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "View",
                        to:`/dashboard/doctor/appointment/${item?.appointment?.id}`,
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
