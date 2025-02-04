"use client"
import FilterSec from '@/components/common/filter-sec'
import { Input } from '@/components/ui'
import React, {useState } from 'react'
import { AlignJustify,LayoutDashboard,Calendar} from 'lucide-react';
import { IconStarFilled } from '@tabler/icons-react';
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from '@/components/reusable/pagination';





export default function Doctors() {
  const [isSearch,setIsSearch]=useState('')
  const [currentPage, setCurrentPage] = useState(2)
  const totalPages = 20;
   const per_page=5

  const doctorItem = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4},
    { id: 5 },
    { id: 6 },

  ];

  return (
    <div>
      <div className='text-center py-14'>
      <h1 className='text-xl lg:text-3xl font-bold'>Search Doctors</h1>
      <h2 className='text-sm'><Link href={"/"}>Home</Link> / Search Doctors</h2>
      </div>
      <div className='container grid grid-cols-1 lg:grid-cols-8 gap-5 pb-12'>
          <div className='border p-3 rounded-md lg:col-span-2'>
             <h1 className='text-lg font-medium py-1'>Filter</h1>
             <FilterSec setIsSearch={setIsSearch} isSearch={isSearch}/>
          </div>
          <div className='lg:col-span-6 rounded-md'>
             <div className='flex justify-between'>
                 <Input className='w-fit' placeholder='Doctors Search hare'></Input>
                 <ul className='flex items-center gap-2'>
                      <li className='flex items-center gap-[2px] text-muted-foreground'><h1 className='border w-fit p-[2px] rounded-sm'><Calendar size={19} /></h1>{formatDate(new Date())}</li>
                     <li className='text-muted-foreground border w-fit p-[2px] rounded-sm'><AlignJustify size={20}/></li>
                     <li className='bg-[#0087BE] text-white  text-muted-foreground border w-fit p-[2px] rounded-sm'><LayoutDashboard size={20} /></li>
                 </ul>
             </div>
             <div className='mt-5'>
             <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
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
      {/* pagination format */}
               <div className='flex justify-end mt-4'>
               <Pagination
                className='w-[320px] flex justify-end'
                page={currentPage}
                totalPage={totalPages}
                onPageChange={setCurrentPage}
                per_page={per_page}
              />
               </div>
             </div>
          </div>
      </div>
    </div>
  )
}
