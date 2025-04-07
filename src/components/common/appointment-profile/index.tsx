import Image from "next/image";
import React from "react";

export default function AppointmentProfile() {
  return (
    <div className="bg-white px-3 py-2 rounded-md">
      <div className="flex gap-3 items-center">
        <Image
          className="rounded-full"
          src={
            "https://doccure.dreamstechnologies.com/html/template/assets/img/clients/client-15.jpg"
          }
          alt="77"
          width={100}
          height={100}
          style={{
            height: "100px",
          }}
        ></Image>
        <ul>
          <li className="font-medium">Dr. Michael Brown </li>
          <li className="text-sm">Psychologist</li>
          <li className="text-gray-500 text-sm">
            5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703
          </li>
        </ul>
      </div>
    </div>
  );
}
