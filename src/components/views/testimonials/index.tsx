"use client";
import TestimonialCard from "@/components/common/testimonial-card";
import patient1 from "@/assets/testimonials/patient1.webp";
import patient2 from "@/assets/testimonials/patient2.webp";
import patient3 from "@/assets/testimonials/patient3.webp";
import patient4 from "@/assets/testimonials/patient4.jpg";
import patient5 from "@/assets/testimonials/patient5.webp";
import { Title } from "@/components/reusable";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { Fade } from "@/components/animation";

const testimonialItem = [
  {
    title: "Nice Treatment",
    content:
      "I had a great experience with Dr. Chen. She was not only professional but also made me feel comfortable discussing.",
    rating: 5,
    user: {
      name: "Rayan Smith",
      title: "United States",
      img: patient1,
    },
  },
  {
    title: "Excellent Service",
    content:
      "I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly.",
    rating: 5,
    user: {
      name: "Sofia Doe",
      title: "United States",
      img: patient2,
    },
  },
  {
    title: "Excellent Service",
    content:
      "I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly.",
    rating: 5,
    user: {
      name: "Deny Hendrawan",
      title: "United States",
      img: patient3,
    },
  },
  {
    title: "Nice Treatment",
    content:
      "I had a great experience with Dr. Chen. She was not only professional but also made me feel comfortable discussing..",
    rating: 5,
    user: {
      name: "Rayan Smith",
      title: "United States",
      img: patient4,
    },
  },
  {
    title: "Excellent Service",
    content:
      "I had a wonderful experience the staff was friendly and attentive, and Dr. Smith took the time to explain everything clearly.",
    rating: 5,
    user: {
      name: "Sofia Doe",
      title: "United States",
      img: patient5,
    },
  },
];

const settings = {
  dots: false,
  infinite: true,
  autoplay: false,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  rtl: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Testimonials() {
  return (
    <div className="container pb-10 lg:pb-20">
      <Title title="Testimonials" text="15k Users Trust healthCare Worldwide" />
      <Fade>
        <Slider {...settings}>
          {testimonialItem.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </Slider>
      </Fade>
      <style jsx global>{`
        .slick-prev,
        .slick-next {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
