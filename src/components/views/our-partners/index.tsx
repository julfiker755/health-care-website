import { Title } from "@/components/reusable";
import Marquee from "react-fast-marquee";
import React from "react";
import assets from "@/assets";
import Image from "next/image";

export default function OurPartners() {
  const partnerItem = [
    { id: 1, img: assets.partner.partner1 },
    { id: 2, img: assets.partner.partner2 },
    { id: 3, img: assets.partner.partner3 },
    { id: 4, img: assets.partner.partner4 },
    { id: 5, img: assets.partner.partner5 },
    { id: 6, img: assets.partner.partner6 },
    { id: 7, img: assets.partner.partner7 },
    { id: 8, img: assets.partner.partner8 },
    { id: 9, img: assets.partner.partner9 },
    { id: 10, img: assets.partner.partner10 },
  ];
  return (
    <div className="container">
      <Title
        title="Our Clinics Partners"
        text="Explore Our Trusted Clinic Partners and Connect with Experts Today"
      />
      <Marquee>
        <div className="flex gap-x-4">
          {partnerItem.map((item, index) => (
            <div key={index} className="border w-fit px-3 py-2 rounded-md">
              <Image
                width={130}
                height={100}
                style={{
                  height: "30px",
                }}
                className="text-black"
                alt={item?.img?.toString()}
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
