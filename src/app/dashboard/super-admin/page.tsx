import React from "react";
import {Dock,UserRound,PackagePlus, Fullscreen} from 'lucide-react'
import { BerChart } from "@/components/views/dashboard/charts/ber-charts";
import { AreaCharts } from "@/components/views/dashboard/charts/area-charts";

const itemData=[
  {
    title:"Appointment",
    total:50,
    icon:Dock
  },{
    title:"Specialities",
    total:20,
    icon:PackagePlus
  },{
    title:"Doctor",
    total:100,
    icon:UserRound
  },{
    title:"Views",
    total:150,
    icon: Fullscreen
  }
]

export default function SuperAdmin() {
  return (
    <div>
         <h1 className='text-xl font-medium mb-2'>Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
         {itemData.map((item,idx)=>(
          <div key={idx} className="border rounded-md p-5">
          <ul className="flex space-y-2 justify-between gap-1">
             <li className="font-medium">{item.title}</li>
             <li className="mr-5 text-gray-500"><item.icon/></li>
          </ul>
          <h1 className="font-bold">{item.total}</h1>
        </div>
         ))}
      </div>
      <div className="grid mt-10 grid-cols-1 lg:grid-cols-2 gap-5">
          <BerChart/>
          <AreaCharts/>
      </div>
    </div>
  );
}
