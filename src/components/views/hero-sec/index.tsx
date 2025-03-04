"use client";
import React, { useState } from "react";
import heroImg from "@/assets/herosec.jpg";
import { Search, Calendar } from "lucide-react";
import { Button, CalendarTable } from "@/components/ui";
import { AnimatedText, Fade } from "@/components/animation";

export default function HeroSec() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div
      style={{
        backgroundImage: `url(${heroImg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="relative h-[calc(100vh-50px)]"
    >
      {/* <Image
        src={heroImg}
        alt="Hero Section"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={75}
        priority 
      /> */}
      <div className="lg:container  h-full">
        <div className="w-full lg:w-1/2  lg:px-2 h-full">
          <div className="flex  backdrop-blur-[1px] bg-[#0087a960] flex-col items-start justify-center h-full">
            <AnimatedText className="text-3xl text-center max-w-md lg:text-start lg:text-6xl font-extrabold text-white">
              Your health is our focus
            </AnimatedText>
            <Fade
              component="p"
              className="text-white text-center lg:text-start"
            >
              Expert physicians, skilled surgeons, cutting-edge technologies,
              and world-class surgical facilities all available locally
            </Fade>
            <Fade className="w-full">
              <ul className="grid space-y-2 lg:space-y-0 grid-cols-1 lg:grid-cols-5 py-1 my-5 mx-2 px-2 lg:border rounded-md">
                <li className="flex items-center gap-1 col-span-1 lg:col-span-2">
                  <h1>
                    <Search color="#d1d5db" size={20} />
                  </h1>
                  <input
                    className="bg-transparent focus:outline-none font-normal placeholder:text-gray-300"
                    type="text"
                    placeholder="Search doctors"
                  />
                </li>
                <li className="flex items-center gap-1 col-span-1 lg:col-span-2">
                  <Calendar color="#d1d5db" size={20} />
                  <CalendarTable
                    selectedDate={selectedDate}
                    onDateChange={(date) => setSelectedDate(date as Date)}
                    placeholder="Select a date"
                  />
                </li>
                <li className="col-span-1">
                  <Button className="w-full lg:w-fit">Search</Button>
                </li>
              </ul>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}
