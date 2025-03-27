import { RatingScore } from "@/components/reusable";
import Image from "next/image";
import React from "react";
import quote from "@/assets/testimonials/quote-icon.svg";

export default function TestimonialCard({ rating, title, content, user }: any) {
  return (
    <div className="border p-2 lg:mx-2 rounded-md">
      <ul className="flex justify-between items-center">
        <li>
          <RatingScore value={rating} />
        </li>
        <li>
          <Image src={quote} width={20} height={100} alt="img1" />
        </li>
      </ul>
      <div className="py-4">
        <h1 className="font-medium text-lg">{title}</h1>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
      <div className="flex gap-3 items-center">
        <div>
          <Image
            className="size-11 rounded-full"
            src={user.img}
            width={100}
            height={100}
            alt="img2"
          ></Image>
        </div>
        <div>
          <h1 className="font-medium">{user.name}</h1>
          <h1 className="text-sm text-gray-600">{user.title}</h1>
        </div>
      </div>
    </div>
  );
}
