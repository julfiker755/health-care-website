"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronUp,ChevronDown} from 'lucide-react';

interface questionProps {
  title: string;
  content: string;
}

interface accordionProps {
  questions:questionProps[];
}

export const Accordion: React.FC<accordionProps> = ({ questions }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(activeAccordion === null ? 0 : contentRef.current.scrollHeight);
    }
  }, [activeAccordion]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full">
        {questions.map((item, index) => (
          <div
            key={index}
            className="py-[10px] px-5 mb-4 rounded-md  !bg-[#F3F4F6] cursor-pointer bg-inherit"
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggleAccordion(index + 1)}
            >
              <h4 className="text-base lg:text-lg font-semibold text-[#1B1B1B]">
                {item.title}
              </h4>
              <span>{activeAccordion === index + 1 ? <ChevronUp/> : <ChevronDown />}</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                activeAccordion === index + 1 ? "max-h-full" : "max-h-0"
              }`}
              style={{
                maxHeight:
                  activeAccordion === index + 1 ? `${contentHeight}px` : "0px",
              }}
              ref={contentRef}
            >
              <p className="text-sm lg:text-base mt-2">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


