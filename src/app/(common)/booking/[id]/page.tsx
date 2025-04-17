"use client";
import AppointmentProfile from "@/components/common/appointment-profile";
import {
  Step1Appointment,
  Step2Information,
  Step2Schedule,
  Step3Payment,
  Step4Confirmation,
} from "@/components/common/booking-step";
import { Stepper } from "@/components/reusable";
import { Button } from "@/components/ui";
import React, { useState } from "react";
import { ParamsProps } from "../../doctors/[id]/page";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import { ShowToast } from "@/helpers";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/lib/utils";
import { useUpdatePatientMutation } from "@/redux/api/patientApi";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";

const steps = [
  { id: 1, title: "Appointment" },
  { id: 2, title: "Schedule" },
  { id: 3, title: "Information" },
  { id: 4, title: "Payment" },
  { id: 5, title: "Confirmation" },
];

export type appointmentProps = {
  appointmentType: string;
  clinicId: string;
  scheduleId: string;
};

export default function Booking({ params: { id } }: ParamsProps) {
  const [updatePatient] = useUpdatePatientMutation();
  const [createAppointment] = useCreateAppointmentMutation();
  const { data } = useGetSingleDoctorQuery(id);
  const [currentStep, setCurrentStep] = useState(4);
  const [appId, setappId] = useState("");
  const [appointment, setIsAppointment] = useState<appointmentProps>({
    appointmentType: "clinic",
    clinicId: "",
    scheduleId: "",
  });

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  //  AppointemntSubmit ****
  const AppointemntSubmit = async () => {
    const scheduleData: any = {
      doctorId: id,
      scheduleId: appointment.scheduleId,
      appointmentType: appointment.appointmentType,
    };
    if (appointment.clinicId) {
      scheduleData.clinicId = appointment.clinicId;
    }
    const res = await createAppointment(scheduleData).unwrap();
    if (res?.id) {
      handleNext();
      setappId(res.id);
    }
  };
  // Information submit
  const handleSubmit = async (values: FieldValues) => {
    const dataItem = {
      blood: values?.blood,
      age: parseInt(values?.age),
      contactNumber: values?.contactNumber,
      address: values?.address,
    };
    if (dataItem) {
      const data = modifyPayload(dataItem);
      const res = await updatePatient(data).unwrap();
      if (res?.id) {
        handleNext();
      }
    }
  };
  return (
    <div className="py-12 max-w-3xl m-auto">
      <Stepper stepItem={steps} currentStep={currentStep} />
      <div className="bg-[#f9f9f9] p-4 mt-5 rounded-md">
        <AppointmentProfile {...data} />
        <div className="bg-white p-4 mt-4 rounded-md">
          {/* step 1 */}
          {currentStep == 1 && (
            <Step1Appointment
              setIsAppointment={setIsAppointment}
              appointment={appointment}
            >
              <Button onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </Step1Appointment>
          )}
          {/* step 2 */}
          {currentStep == 2 && (
            <Step2Schedule
              setIsAppointment={setIsAppointment}
              appointment={appointment}
              schedule={data?.schedule}
            >
              <Button onClick={handleBack}>Back</Button>
              <Button
                onClick={() =>
                  !!appointment.scheduleId
                    ? AppointemntSubmit()
                    : ShowToast({
                        type: "error",
                        title: "Schedule Required",
                        description: "Please select a schedule to proceed.",
                      })
                }
              >
                Next
              </Button>
            </Step2Schedule>
          )}
          {/* step 3 */}
          {currentStep == 3 && (
            <Step2Information handleSubmit={handleSubmit}>
              <Button onClick={handleBack}>Back</Button>
              <Button type="submit">Next</Button>
            </Step2Information>
          )}
          {/* step 4 */}
          {currentStep == 4 && (
            <Step3Payment price={data?.appointmentFee} appointmentId={appId}>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </Step3Payment>
          )}
          {/* step 5 */}
          {currentStep == 5 && (
            <Step4Confirmation>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </Step4Confirmation>
          )}
        </div>
      </div>
    </div>
  );
}
