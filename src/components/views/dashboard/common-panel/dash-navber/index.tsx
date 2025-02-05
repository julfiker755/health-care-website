import React from 'react';
import { AlignJustify } from 'lucide-react';
import { sidebarProps } from '../sider-ber';
import Search from '../search';
import DropdownUser from '../droupdown';


const Header = ({sidebarOpen,setSidebarOpen}:sidebarProps) => {
    return (
        <div className='sticky top-0 z-999 flex w-full bg-[#038bd9]/90
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
            <DropdownUser/>
         </div>
      </div>
    </header>
   </div>
    );
};

export default Header;