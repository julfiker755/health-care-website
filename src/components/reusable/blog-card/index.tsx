import { Badge } from "@/components/ui";
import { Calendar1Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

export function BlogCard({ item }: { item: any }) {
  const { description, date, author, image, category, title, id } = item || {};
  return (
    <div className="bg-white p-3 border border-gray-200 rounded-lg overflow-hidden shadow-sm  transition-shadow duration-300">
      <div className="relative h-48 rounded-md w-full overflow-hidden">
        <Badge
          className={`absolute top-3 py-[2px] px-1 rounded-full left-3 z-10 bg-cyan-500`}
        >
          {category}
        </Badge>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover cursor-pointer  [transition:1.5s] duration-300  hover:scale-105"
        />
      </div>

      <div>
        <div className="flex items-center my-2">
          <div className="flex items-center">
            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {author.name}
            </span>
          </div>
          <div className="ml-auto flex items-center text-sm text-gray-500">
            <Calendar1Icon className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
    </div>
  );
}

export function BlogLatestCard({ item }: { item: any }) {
  const { date, image, title } = item || {};
  return (
    <div className="flex gap-2">
      <div className="relative  rounded-md h-[80px] w-[120px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover cursor-pointer [transition:1.5s] duration-300  hover:scale-105"
        />
      </div>
      <div className="w-full">
        <div className="ml-auto flex items-center text-sm text-gray-500">
          {date}
        </div>
        <h3 className="text-base font-semibold mb-2 hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}
