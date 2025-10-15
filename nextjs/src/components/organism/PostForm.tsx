"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostFormData {
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
}

interface PostFormProps {
  initialData?: Partial<PostFormData>;
  postId?: string;
  isEditing?: boolean;
}

export function PostForm({
  initialData,
  postId,
  isEditing = false,
}: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    imageUrl: initialData?.imageUrl || "",
    published: initialData?.published || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent,
    saveType: "draft" | "publish"
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      setIsLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      setError("Content is required");
      setIsLoading(false);
      return;
    }

    try {
      const url = isEditing ? `/api/posts/${postId}` : "/api/posts";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          published: saveType === "publish",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save post");
      }

      // Redirect to posts page with success message
      router.push(
        "/dashboard/posts?message=" +
          encodeURIComponent(
            `Post ${isEditing ? "updated" : "created"} successfully!`
          )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert alert-error">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <form className="space-y-6">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title..."
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Featured Image URL
                  </span>
                  <span className="label-text-alt text-base-content/60">
                    Optional
                  </span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Content *</span>
                  <button
                    type="button"
                    onClick={() => setPreview(!preview)}
                    className="label-text-alt btn btn-xs btn-ghost"
                  >
                    {preview ? "Edit" : "Preview"}
                  </button>
                </label>

                {preview ? (
                  <div className="min-h-[400px] p-4 border border-base-300 rounded-lg bg-base-50">
                    <div className="prose max-w-none">
                      {formData.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your post content here..."
                    className="textarea textarea-bordered w-full min-h-[400px] resize-none"
                    required
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "draft")}
                  disabled={isLoading}
                  className="btn btn-outline flex-1"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
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
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                      Save as Draft
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "publish")}
                  disabled={isLoading}
                  className="btn btn-primary flex-1"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      {isEditing ? "Update & Publish" : "Publish"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Status */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h3 className="font-semibold mb-4">Post Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <span
                  className={`badge ${
                    formData.published ? "badge-success" : "badge-warning"
                  }`}
                >
                  {formData.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Publish immediately</span>
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Writing Tips */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h3 className="font-semibold mb-4">Writing Tips</h3>
            <div className="space-y-3 text-sm text-base-content/70">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Use a compelling title that captures attention</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Break content into short paragraphs for readability</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Add a featured image to make your post stand out</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Save as draft first, then publish when ready</span>
              </div>
            </div>
          </div>

          {/* Character Count */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h3 className="font-semibold mb-4">Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Title characters:</span>
                <span
                  className={
                    formData.title.length > 60
                      ? "text-warning"
                      : "text-base-content"
                  }
                >
                  {formData.title.length}/60
                </span>
              </div>
              <div className="flex justify-between">
                <span>Content characters:</span>
                <span>{formData.content.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated read time:</span>
                <span>
                  {Math.max(
                    1,
                    Math.ceil(formData.content.split(" ").length / 200)
                  )}{" "}
                  min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
