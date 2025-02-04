import React from "react";
import FilterMenu from "@/components/reusable/filter-menu";
import { Checkbox } from "@/components/ui";

interface filterItemProps {
  title: string;
  items: { label: string; value: string }[];
}

interface filterSecProps {
  isSearch: string;
  setIsSearch: (value: string) => void;
}


export default function FilterSec({ setIsSearch,isSearch}:filterSecProps) {
  const filterItem: filterItemProps[] = [
    {
      title: "Gender",
      items: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      title: "Speciality",
      items: [
        { label: "Neurology", value: "neurology" },
        { label: "Cardiology", value: "cardiology" },
        { label: "Urology", value: "urology" },
        { label: "Orthopedic", value: "orthopedic" },
        { label: "Dentistry", value: "dentistry" },
      ],
    },
    {
      title: "Experience",
      items: [
        { label: "1-5 Years", value: "5" },
        { label: "5+ Years", value: "6" },
        { label: "6+ Years", value: "7" },
      ],
    },
    {
      title: "Languages",
      items: [
        { label: "English", value: "english" },
        { label: "Bangla", value: "bangla" },
        { label: "Hindi", value: "hindi" },
        { label: "Spanish", value: "spanish" },
      ],
    },
  ];
  return (
    <>
      {filterItem.map((item, index) => (
        <FilterMenu key={index} title={item.title}>
          <ul className="space-y-1">
            {item.items.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <Checkbox onClick={()=>setIsSearch(item.value)} />
                {item.label}
              </li>
            ))}
          </ul>
        </FilterMenu>
      ))}
    </>
  );
}
