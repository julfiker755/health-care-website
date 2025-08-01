import assets from "@/assets";
import { BlogCard, BlogLatestCard, Breadcrumb } from "@/components/reusable";
import { makeStore } from "@/redux/store";
import React from "react";
import { doctorsApi } from "@/redux/api/doctorApi";

const blogItem = [
  {
    id: 1,
    title: "10 Tips for Maintaining a Healthy Lifestyle Year-Round",
    description:
      "Discover practical, everyday tips to help you stay healthy throughout the year.",
    category: "Health Tips",
    image: assets.blog.blog1Img,
    author: {
      name: "Arthur Hetzel",
      avatar: assets.blog.ProImg1,
    },
    date: "4 Dec 2024",
  },
  {
    id: 2,
    title: "Understanding Common Symptoms: When to See a Doctor",
    description:
      "Learn how to identify common symptoms and when it's important to seek medical attention.",
    category: "Awareness",
    image: assets.blog.blog2Img,
    author: {
      name: "Robin Frost",
      avatar: assets.blog.ProImg2,
    },
    date: "14 Apr 2024",
  },
  {
    id: 3,
    title: "Nutrition and Wellness: A Guide to Balanced Eating",
    description:
      "Discover the fundamentals of nutrition and how to maintain a balanced diet for optimal health.",
    category: "Nutrition",
    image: assets.blog.blog3Img,
    author: {
      name: "Alyce Buck",
      avatar: assets.blog.ProImg3,
    },
    date: "21 May 2024",
  },
  {
    id: 4,
    title: "Top Preventive Health Measures Everyone Should Take",
    description:
      "Learn about essential preventive health measures to maintain your wellbeing and prevent illness.",
    category: "Prevention",
    image: assets.blog.blog4Img,
    author: {
      name: "Bernadette Vogel",
      avatar: assets.blog.ProImg4,
    },
    date: "11 May 2024",
  },
  {
    id: 5,
    title: "Mental Health Matters: Tips for Managing Stress and Anxiety",
    description:
      "Earn practical techniques to manage stress and anxiety, and improve your emotional well-being.",
    category: "Wellness",
    image: assets.blog.blog5Img,
    author: {
      name: "Gregory Johnson",
      avatar: assets.blog.ProImg5,
    },
    date: "15 Jun 2024",
  },
  {
    id: 6,
    title: "Advancements in Medical Technology: What’s New in Healthcare?",
    description:
      "From AI in diagnostics to cutting-edge treatments, discover how innovation is use in healthcare.",
    category: "Technology",
    image: assets.blog.blog6Img,
    author: {
      name: "Teresa Baxter",
      avatar: assets.blog.ProImg6,
    },
    date: "22 Jun 2024",
  },
];

export default async function Blogs() {
  const store = makeStore();
  // Prefetch on server
  await store.dispatch(doctorsApi.endpoints.getAllDoctor.initiate({}));

  const { data: doctor } = doctorsApi.endpoints.getAllDoctor.select({})(
    store.getState()
  );

  // Optional log for debugging
  console.log("Doctors from SSR:", doctor);

  return (
    <div className="pb-20">
      {/* {doctor?.doctors.map((item: any, idx: any) => (
        <h1 key={idx}>{item.name}</h1>
      ))} */}
      <Breadcrumb>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Explore Our Blog
        </h1>
        <p className="text-sm text-gray-600 max-w-sm mx-auto">
          Dive into the latest insights and trends in healthcare, wellness, and
          technology.
        </p>
      </Breadcrumb>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogItem.map((post) => (
                <BlogCard key={post.id} item={post} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 p-3 border border-gray-200 h-fit rounded-lg">
            <h1 className="text-xl font-semibold mb-5">Latest News</h1>
            <div className="space-y-4">
              {blogItem.map((post) => (
                <BlogLatestCard key={post.id} item={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
