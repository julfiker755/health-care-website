"use client";
import Image from "next/image";
import React from "react";
import { useQRCode } from "next-qrcode";
import { Loader } from "lucide-react";

export default function QrCode({ id, loading }: { id: string; loading: any }) {
  const { Canvas } = useQRCode();
  return (
    <div className="w-[220px] relative h-[200px]">
      {loading ? (
        <div className="flex w-[150px] h-[140px] justify-center m-auto items-center">
          <Loader size={23} className="animate-spin text-[#2762cf] m-auto" />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Canvas
            text={`"https://github.com/julfiker755?${id}`}
            options={{
              errorCorrectionLevel: "M",
              margin: 2,
              scale: 4,
              width: 150,
            }}
          />
        </div>
      )}
      <h1 className="text-center text-gray-500 text-sm">
        Scan this QR Code to Download the details of Appointment
      </h1>
    </div>
  );
}
