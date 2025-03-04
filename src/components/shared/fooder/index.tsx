import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Fade } from "@/components/animation";

export default function Fooder() {
  return (
    <Fade className="container">
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-10">
        <div className="col-span-3">
          <h1 className="text-2xl font-extrabold text-[#0e82fd] mb-1">
            Health Care
          </h1>
          <p className="text-[15px]">
            Easily book your medical appointments with Doccure. Connect with
            healthcare professionals, manage your schedule, and focus on your
            well-being
          </p>
        </div>
        <div className="col-span-2">
          <h1 className="font-medium text-lg mb-2">Specialities</h1>
          <ul className="space-y-1">
            <li className="text-gray-600">Neurology</li>
            <li className="text-gray-600">Cardiology</li>
            <li className="text-gray-600">Ophthalmology</li>
            <li className="text-gray-600">Dermatology</li>
          </ul>
        </div>
        <div className="col-span-2">
          <h1 className="font-medium text-lg mb-2">Quick Links</h1>
          <ul className="space-y-1">
            <li className="text-gray-600">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-gray-600">
              <Link href={"/doctors"}>Doctors</Link>
            </li>
            <li className="text-gray-600">Patients</li>
            <li className="text-gray-600">Blog</li>
          </ul>
        </div>
        <div className="col-span-2">
          <h1 className="font-medium text-lg mb-2">Contact Us</h1>
          <ul className="space-y-2">
            <li className="text-gray-600 flex items-center gap-[4px]">
              <MapPin size={18} />
              556 Beech Street
            </li>
            <li className="text-gray-600 flex items-center gap-[4px]">
              <Phone size={18} />
              +1 315 369 5943
            </li>
            <li className="text-gray-600 flex items-center gap-[4px]">
              <Mail size={18} />
              admin@example.com
            </li>
          </ul>
        </div>
      </div>
    </Fade>
  );
}
