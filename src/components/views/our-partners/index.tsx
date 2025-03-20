import { Title } from "@/components/reusable";
import Marquee from "react-fast-marquee";
import React from "react";
import assets from "@/assets";
import Image from "next/image";

export default function OurPartners() {
  const partnerItem = [
    { id: 1, img: assets.images.partners.partners1 },
    { id: 2, img: assets.images.partners.partners2 },
    { id: 3, img: assets.images.partners.partners3 },
    { id: 4, img: assets.images.partners.partners4 },
    { id: 5, img: assets.images.partners.partners5 },
    { id: 6, img: assets.images.partners.partners6 },
  ];
  return (
    <div className="container">
      <Title
        title="Our Clinics Partners"
        text="Explore Our Trusted Clinic Partners and Connect with Experts Today"
      />
      <Marquee>
        <div className="flex gap-9">
          {partnerItem.map((item, index) => (
            <div key={index} className="border w-fit px-3 py-2 rounded-md">
              <Image
                width={130}
                height={100}
                alt={item.img.toString()}
                src={item.img}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

// [mask-image:linear-gradient(to_right,#00000059,black,#00000059)]
