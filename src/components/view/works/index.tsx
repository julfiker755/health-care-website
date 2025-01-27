import React from "react";
import { Title } from "@/components/reusable";
import assets from "@/assets";
import Image from "next/image";

export default function Works() {
  const stepItems = [
    {
      title: "Find a Doctor",
      text: "Locate doctors by specialization, location, or availability to suit your needs.",
      image: assets.images.solution.findImg,
    },
    {
      title: "View Doctor Profiles",
      text: "Access detailed profiles to make informed choices for your healthcare.",
      image: assets.images.solution.profileImg,
    },
    {
      title: "Book an Appointment",
      text: "Choose your preferred doctor, pick a suitable time slot, and confirm your booking.",
      image: assets.images.solution.bookImg,
    },
    {
      title: "Receive Care",
      text: "Share your health concerns and get personalized advice and solutions from the doctor.",
      image: assets.images.solution.receiveImg,
    },
  ];

  return (
    <div className="bg-[#F9FCFF] py-10 lg:py-20">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="self-center hidden lg:block">
           <Image src={assets.images.solution.workImg}
           className="rounded-md"
               width={200}
               height={100}
               style={{
                 width:'100%',
                 display: 'block',
                 margin: 'auto',
                 maxWidth: '100%',
               }}
               alt="solution"
           />
        </div>
        <div className="col-span-2">
          <h1 className="text-sm text-[#0E82FD]">How it Works</h1>
          <Title
            titleStyle="text-start font-bold mb-5"
            title="Four Simple Steps to Find Your Solution"
          ></Title>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {stepItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="w-[120px] h-fit rounded-md lg:rounded-none lg:rounded-tr-xl lg:rounded-bl-xl bg-[#DBEFFE]">
                  <Image
                    className="m-auto h-[60px]"
                    src={item.image}
                    width={35}
                    height={100}
                    alt={item?.title}
                  ></Image>
                </div>
                <div>
                  <h1 className="text-lg font-medium">{item.title}</h1>
                  <p className="text-base text-[#374151]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
