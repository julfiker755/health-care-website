import React from "react";

interface stepItemProps {
  id: number;
  title: string;
}

interface stepperProps {
  stepItem: stepItemProps[];
  currentStep: number;
}

export function Stepper({ stepItem, currentStep }: stepperProps) {
  return (
    <div className="relative w-full max-w-lg lg:mx-auto px-4">
      {/* Line behind steps */}
      <div className="absolute left-[31px] top-0 w-0.5 h-full lg:top-4 lg:left-[12.5%] lg:right-[12.5%] lg:w-auto lg:h-0.5 bg-gray-300 z-0" />

      {/* Line for completed steps */}
      {/* big */}
      <div
        className="hidden lg:block absolute top-4 h-0.5 bg-blue-600 z-0 transition-all duration-300"
        style={{
          left: "12.5%",
          width: `${((currentStep - 1) / (stepItem.length - 1)) * 75}%`,
        }}
      />
      {/* small*/}
      <div
        className="block lg:hidden absolute left-[32px] top-0 w-0.5 bg-blue-600 z-0 transition-all duration-300"
        style={{
          left: "31px",
          height: `${((currentStep - 1) / (stepItem.length - 1)) * 100}%`,
        }}
      />

      <div className="flex-col  lg:flex-row flex space-y-3 lg:space-y-0 lg:justify-between lg:items-center relative z-10">
        {stepItem.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="flex gap-x-1 lg:gap-x-0 lg:flex-col items-center"
            >
              <div
                className={`w-8 h-8 relative rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
                  isCompleted
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : isActive
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : "bg-gray-400 text-white border-2 border-gray-400"
                }`}
              >
                {step.id}
              </div>
              <div className="text-sm font-medium lg:mt-2 text-center whitespace-nowrap">
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
