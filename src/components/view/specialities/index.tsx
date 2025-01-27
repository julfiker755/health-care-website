import React from "react";
import { Title } from "@/components/reusable";
import Image from "next/image";

export default function Specialities() {
  const medicalFields = [
    { title: "Neurology", doctor: 10 },
    { title: "Cardiology", doctor: 10 },
    { title: "Urology", doctor: 10 },
    { title: "Orthopedic", doctor: 10 },
    { title: "Dentistry", doctor: 10 },
    { title: "Ophthalmology", doctor: 10 },
    { title: "Dermatology", doctor: 10 },
    { title: "Pediatrics", doctor: 10 },
    { title: "Psychiatry", doctor: 10 },
    { title: "Psychiatry", doctor: 10 },
  ];
  // text="Discover skilled doctors in every specialty"
  return (
    <div className="container py-10 lg:py-20">
      <Title className="pb-5" title="Specialities"></Title>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {medicalFields.map((item, index) => (
          <div
            className="border rounded-md p-3 lg:flex items-center gap-1"
            key={index}
          >
            <Image
              className="border m-auto lg:m-0 rounded-full"
              src={
                "https://doccure.dreamstechnologies.com/html/template/assets/img/specialities/specialities-05.svg"
              }
              width={70}
              height={100}
              alt="image in picture"
            ></Image>
            <div className="text-center lg:text-start">
              <h1 className="text-lg font-medium">{item.title}</h1>
              <h3 className="text-sm text-gray-800">{item.doctor} Doctors</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
