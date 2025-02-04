import React from "react";
import { IconStarFilled } from '@tabler/icons-react';
import { Title } from "@/components/reusable";
import Image from "next/image";

export default function BestDoctors() {
  const doctorItem = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];
  return (
    <div className="container">
      <Title className="pb-5" title="Best Doctors"></Title>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 mb-10">
        {doctorItem.map((item) => (
          <div key={item.id} className="border rounded-md p-2">
            <div className="relative">
            <Image src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-02.jpg"
            alt="77"
            className='m-auto relative'
             width={200}
             height={100}
             style={{
               width:'100%',
               display: 'block',
               margin: 'auto',
               maxWidth: '100%',
               height: '180px',
             }}
            
            ></Image>
            </div>
            <div className="py-2 flex justify-between">
              <ul>
                <li className="text-lg font-medium">Dr. Ruby Perrin</li>
                <li className="text-gray-600 text-sm">Maxillofacial Surgery</li>
              </ul>
              <div className="bg-[#1C5B91] flex items-center gap-[2px] w-fit h-fit text-white px-2 rounded-md text-sm"><IconStarFilled size={16} />4.8</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
