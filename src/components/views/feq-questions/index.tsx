"use client";
import React from "react";
import { Title } from "@/components/reusable";
import Image from "next/image";
import questionImg from "@/assets/feq_question.jpg";
import { Accordion } from "@/components/common/accordion";
import { Fade } from "@/components/animation";

export default function Works() {
  const questionsItem = [
    {
      title: "How do I book an appointment with a doctor?",
      content:
        "Visit our website, log in or create an account, and search for a doctor by specialization, location, or availability. Select your preferred doctor and confirm your booking.",
    },
    {
      title: "Can I request a specific doctor when booking my appointment?",
      content:
        "Yes, you can request a specific doctor. Use the search functionality on our website to find the doctor by name, specialization, or location, then proceed to book an appointment.",
    },
    {
      title:
        "What should I do if I need to cancel or reschedule my appointment?",
      content:
        "To cancel or reschedule, log in to your account on our website. Navigate to your appointment history, select the appointment you want to modify, and follow the steps to cancel or choose a new date and time.",
    },
    {
      title:
        "What happens if I need to cancel or reschedule at the last minute?",
      content:
        "We understand emergencies happen. Please cancel or reschedule as soon as possible through your account. Note that late cancellations may be subject to a fee depending on the clinic's policy.",
    },
    {
      title: "What if I'm running late for my appointment?",
      content:
        "If you're running late, contact the clinic directly to inform them. Depending on their schedule, they may still accommodate you or help you reschedule.",
    },
    {
      title: "Can I book appointments for family members or dependents?",
      content:
        "Yes, you can book appointments for family members or dependents. Log in to your account, add their details under 'Family Members,' and select the appropriate person when booking an appointment.",
    },
  ];

  return (
    <div className="bg-[#F9FCFF] py-10 lg:py-20">
      <div className="container">
        <div className="lg:pb-3">
          <h1 className="text-sm text-[#0E82FD]">Get Your Answer</h1>
          <Title
            titleStyle="text-start font-bold mb-5"
            title="Frequently Asked Questions"
          ></Title>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Fade className="col-span-2">
                <Accordion questions={questionsItem}></Accordion>
              </Fade>
            </div>
          </div>
          <Fade animate="fade_right" className="hidden lg:block">
            <Image
              src={questionImg}
              className="rounded-sm object-cover"
              width={800}
              height={100}
              quality={100}
              style={{
                width: "100%",
                display: "block",
                margin: "auto",
                maxWidth: "100%",
                height: "370px",
              }}
              alt="solution"
            />
          </Fade>
        </div>
      </div>
    </div>
  );
}
