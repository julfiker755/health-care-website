"use client";
import { TableCell, TableRow } from "@/components/ui";
import {
  DroupdownActions,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { useGetMyAppointmentQuery } from "@/redux/api/appointmentApi";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import useAuth from "@/components/context/auth-info";

export default function Appointment() {
  const { authInfo } = useAuth();
  const [createPayment] = useCreatePaymentMutation();
  const { data, isLoading } = useGetMyAppointmentQuery({});
  const headers = [
    "Day",
    "Date",
    "Start Time",
    "End Time",
    "Payment",
    "Action",
  ];

  // hanldePayment
  const hanldePayment = async (doctorId: string, appointId: string) => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_TEST_KEY as string
    );
    if (!stripe) {
      throw new Error("Stripe failed to load.");
    }

    const body = {
      doctorId: doctorId,
      appointmentId: appointId,
      price: "",
      email: authInfo?.email,
    };
    const res = await createPayment(body).unwrap();
    if (res?.id) {
      await stripe.redirectToCheckout({ sessionId: res.id });
    }
  };

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
                  {item.status === "COMPLETED" ? (
                    "Paid"
                  ) : (
                    <h1
                      onClick={() => hanldePayment(item.doctorId, item.id)}
                      className="text-[#ec2f91] cursor-pointer"
                    >
                      Pay
                    </h1>
                  )}
                </TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "link",
                        label: "View",
                        to: `/dashboard/patient/appointment/${item.id}`,
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
