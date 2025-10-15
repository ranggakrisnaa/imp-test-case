"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PostForm } from "@/components/organism/PostForm";
import Link from "next/link";

export default function CreatePostPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create New Post</h1>
            <p className="text-base-content/70">
              Write and publish your blog post
            </p>
          </div>
          <Link href="/dashboard/posts" className="btn btn-ghost">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Posts
          </Link>
        </div>

        {/* Post Form */}
        <PostForm />
      </div>
    </DashboardLayout>
  );
}
