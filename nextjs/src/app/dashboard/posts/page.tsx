"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const togglePublishStatus = async (
    postId: string,
    currentStatus: boolean
  ) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !currentStatus,
        }),
      });

      if (response.ok) {
        setPosts(
          posts.map((post) =>
            post.id === postId ? { ...post, published: !currentStatus } : post
          )
        );
      } else {
        alert("Failed to update post status");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post status");
    }
  };

  const filteredPosts = posts
    .filter((post) => {
      if (filter === "published") return post.published;
      if (filter === "draft") return !post.published;
      return true;
    })
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-base-content">Posts</h1>
            <p className="text-base-content/70">
              Manage all your blog posts here
            </p>
          </div>
          <Link
            href="/dashboard/posts/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Create Post
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-base-100 rounded-lg p-4 shadow-sm border border-base-300">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-base-content">
                Filter:
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === "all"
                      ? "bg-primary/20 text-primary"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  All ({posts.length})
                </button>
                <button
                  onClick={() => setFilter("published")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === "published"
                      ? "bg-primary/20 text-primary"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  Published ({posts.filter((p) => p.published).length})
                </button>
                <button
                  onClick={() => setFilter("draft")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === "draft"
                      ? "bg-primary/20 text-primary"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  Drafts ({posts.filter((p) => !p.published).length})
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="block w-full pl-10 pr-3 py-2 border border-base-300 rounded-md leading-5 bg-base-200 text-base-content placeholder-base-content/50 focus:outline-none focus:placeholder-base-content/40 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-base-content/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-base-100 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4">Loading posts...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="divide-y divide-base-300">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 hover:bg-base-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-base-content line-clamp-1">
                          {post.title}
                        </h3>
                        <span
                          className={`badge badge-sm ${
                            post.published ? "badge-success" : "badge-warning"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <p className="text-base-content/70 mb-3 line-clamp-2">
                        {truncateContent(post.content)}
                      </p>

                      <div className="flex items-center text-sm text-base-content/60 space-x-4">
                        <span>By {post.author.name}</span>
                        <span>•</span>
                        <span>Created {formatDate(post.createdAt)}</span>
                        {post.updatedAt !== post.createdAt && (
                          <>
                            <span>•</span>
                            <span>Updated {formatDate(post.updatedAt)}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/posts/edit/${post.id}`}
                        className="btn btn-ghost btn-sm"
                      >
                        <svg
                          className="w-4 h-4"
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
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          togglePublishStatus(post.id, post.published)
                        }
                        className={`btn btn-sm ${
                          post.published ? "btn-warning" : "btn-success"
                        }`}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => setDeleteConfirm(post.id)}
                        className="btn btn-error btn-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
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
                {searchQuery || filter !== "all"
                  ? "No posts found"
                  : "No posts yet"}
              </h3>
              <p className="text-base-content/50 mb-4">
                {searchQuery || filter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Create your first blog post to get started."}
              </p>
              {!searchQuery && filter === "all" && (
                <Link
                  href="/dashboard/posts/create"
                  className="btn btn-primary"
                >
                  Create Post
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Delete</h3>
              <p className="py-4">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="modal-action">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
