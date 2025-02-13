import React from 'react';
import { AlignJustify } from 'lucide-react';
import { sidebarProps } from '../sider-ber';
import Search from '../search';
import dynamic from 'next/dynamic';
import useAuth from '@/components/context/auth-info';


const Header = ({sidebarOpen,setSidebarOpen}:sidebarProps) => {
  const {authInfo}=useAuth()
  const  AuthDiv = dynamic(() => import('@/components/common/access-auth'), { ssr: false })
    return (
        <div className='sticky top-0 z-[9] flex w-full bg-[#038bd9]/95
         py-2 shadow-1'>
      <header className="w-full px-3">
      <div className="flex justify-between items-center">
          {/* left side*/}
          <div className='flex gap-4 items-center'>
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block  border rounded-md border-stroke  p-1 shadow-sm lg:hidden"
          >
            <AlignJustify size={20} color='white'/>
          </button>
           <Search></Search>
          </div>
          {/* right side */}
         <div>
            {!!authInfo && <AuthDiv/>}
         </div>
      </div>
    </header>
   </div>
    );
};

export default Header;