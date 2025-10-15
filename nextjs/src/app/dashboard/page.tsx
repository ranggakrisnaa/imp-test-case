"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: {
    name: string;
  };
}

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  recentPosts: Post[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    recentPosts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome to Blog Space!</h1>
          <p className="opacity-90">
            Manage your blog posts and track your writing progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
            <div className="flex items-center">
              <div className="p-3 bg-primary/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">
                  Total Posts
                </p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    stats.totalPosts
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
            <div className="flex items-center">
              <div className="p-3 bg-success/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">
                  Published
                </p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    stats.publishedPosts
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
            <div className="flex items-center">
              <div className="p-3 bg-warning/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">
                  Drafts
                </p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    stats.draftPosts
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="bg-base-100 rounded-lg shadow-lg">
          <div className="p-6 border-b border-base-300">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Posts</h2>
              <Link href="/dashboard/posts" className="btn btn-primary btn-sm">
                View All
              </Link>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : stats.recentPosts.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-base-content line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-base-content/70 mt-1">
                        {formatDate(post.createdAt)} • By {post.author.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`badge ${
                          post.published ? "badge-success" : "badge-warning"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <Link
                        href={`/dashboard/posts/edit/${post.id}`}
                        className="btn btn-ghost btn-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 text-base-content/50 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-base-content/70 mb-2">
                  No posts yet
                </h3>
                <p className="text-base-content/50 mb-4">
                  Create your first blog post to get started.
                </p>
                <Link
                  href="/dashboard/posts/create"
                  className="btn btn-primary"
                >
                  Create Post
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/dashboard/posts/create"
            className="bg-base-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-dashed border-base-300 hover:border-primary group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Create New Post</h3>
                <p className="text-sm text-base-content/70">
                  Start writing your next blog post
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/posts"
            className="bg-base-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-dashed border-base-300 hover:border-primary group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14-7H3a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Manage Posts</h3>
                <p className="text-sm text-base-content/70">
                  View and edit all your posts
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
