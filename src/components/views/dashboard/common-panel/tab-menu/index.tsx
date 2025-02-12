import React from 'react'

interface TabProps {
    items: string[],
    isTab: string,
    setIsTab: (value: string) => void
}

export default function TabMenu({ items, isTab, setIsTab }: TabProps) {
  return (
    <ul className='flex gap-2 flex-wrap [&_li]:text-sm'>
      {items.map((item, index) => (
        <li key={index}>
          <button 
            className={`py-[5px] px-3 rounded-md border ${
              isTab === item ? 'bg-[#0087BE] text-white border-[#0087BE]' : 'text-gray-600 border'
            }`}
            onClick={() => setIsTab(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}
