"use client";
import { DashTitle } from "@/components/reusable/dash-title";
import { Button } from "@/components/ui";
import { PlaceholderImg } from "@/lib/utils";
import {
  useGetAllBlogQuery,
  useRemoveBlogsMutation,
} from "@/redux/api/blogApi";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function Blog() {
  const { data, refetch } = useGetAllBlogQuery({});
  const [deleteBlog, { isLoading }] = useRemoveBlogsMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBlog(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashTitle
          title="All Blog"
          description="Manage your Blog and view their details"
        />
        <Link href="/dashboard/doctor/blog/store">
          <Button>Blog Store</Button>
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {data?.blog?.map((item: any, index: number) => (
            <div
              key={index}
              className="relative group bg-white p-3 border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow duration-300"
            >
              {/* Delete Icon on Hover */}
              <button
                className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(item.id)}
                disabled={isLoading}
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              {/* Blog Image */}
              <div className="relative h-48 rounded-md w-full overflow-hidden">
                <Image
                  src={
                    item?.image !== null
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item?.image}`
                      : PlaceholderImg(200, 200)
                  }
                  alt={item?.title || "Blog image"}
                  fill
                  className="object-cover cursor-pointer transition duration-300 hover:scale-105"
                />
              </div>

              {/* Blog Content */}
              <div className="mt-2">
                <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.short_content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
