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

const steps = [
  { id: 1, title: "Appointment" },
  { id: 2, title: "Schedule" },
  { id: 3, title: "Information" },
  { id: 4, title: "Payment" },
  { id: 5, title: "Confirmation" },
];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Appointment />;
      case 2:
        return <Step2Schedule />;
      case 3:
        return <Step2Information />;
      case 4:
        return <Step3Payment />;
      case 5:
        return <Step4Confirmation />;
      default:
        return null;
    }
  };

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

  return (
    <div className="py-12 max-w-3xl m-auto">
      <Stepper stepItem={steps} currentStep={currentStep} />
      <div className="bg-[#f9f9f9] p-4 mt-5 rounded-md">
        {currentStep !== 5 && <AppointmentProfile />}
        <div className="bg-white my-3 px-3 pt-4 rounded-md">
          {renderStepComponent()}
          {currentStep !== 5 && (
            <div className="flex justify-between pb-4 mt-6">
              <Button onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
              >
                {currentStep === steps.length ? "Finish" : "Next"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
