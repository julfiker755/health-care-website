import React, { useState } from "react";
import FilterMenu from "@/components/reusable/filter-menu";
import { Checkbox } from "@/components/ui";

interface FilterItemProps {
  title: string;
  items: { label: string; value: string }[];
}

interface FilterSecProps {
  setIsFilter: (filter: { title?: string; value?: string }) => void;
}

export default function FilterSec({ setIsFilter }: FilterSecProps) {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});

  const filterItem: FilterItemProps[] = [
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
        { label: "1-2 Years", value: "2" },
        { label: "3-5 Years", value: "5" },
        { label: "6+ Years", value: "6" },
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

  const handleCheckboxChange = (
    filter: string,
    value: string,
    isChecked: Boolean
  ) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (newFilters[filter] === value) {
        delete newFilters[filter];
      } else {
        newFilters[filter] = value;
      }

      return newFilters;
    });
    if (isChecked) {
      setIsFilter({ title: filter, value });
    } else {
      setIsFilter({});
    }
  };

  return (
    <>
      {filterItem.map((item, index) => (
        <FilterMenu key={index} title={item.title}>
          <ul className="space-y-1">
            {item.items.map((filterItem, idx) => (
              <li
                key={idx}
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <Checkbox
                  checked={selectedFilters[item.title] === filterItem.value}
                  onCheckedChange={(isChecked: boolean) => {
                    handleCheckboxChange(
                      item.title,
                      filterItem.value,
                      isChecked
                    );
                  }}
                />
                {filterItem.label}
              </li>
            ))}
          </ul>
        </FilterMenu>
      ))}
    </>
  );
}
