"use client";
import { Button, Input } from "@/components/ui";
import React from "react";

export default function NewsSubscribe() {
  return (
    <div className="container pt-10 lg:pt-20">
      <div className="lg:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Join Our Newsletter</h1>
          <p>Subscribe Now for Exclusive Insights & Offers</p>
        </div>
        <div className="flex gap-2 mt-3 lg:mt-0 items-center">
          <Input className="h-9" placeholder="Enter Your Email"></Input>
          <Button>Subscribe</Button>
        </div>
      </div>
      <hr className="border-t-[1px] my-8" />
    </div>
  );
}
