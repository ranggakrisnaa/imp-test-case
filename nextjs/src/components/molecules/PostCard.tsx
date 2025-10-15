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

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "featured";
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePublish?: (id: string, currentStatus: boolean) => void;
}

export function PostCard({
  post,
  variant = "default",
  showActions = false,
  onEdit,
  onDelete,
  onTogglePublish,
}: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const estimatedReadTime = Math.max(
    1,
    Math.ceil(post.content.split(" ").length / 200)
  );

  if (variant === "compact") {
    return (
      <div className="bg-base-100 rounded-lg p-4 border border-base-300 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base-content line-clamp-1">
                {post.title}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  post.published
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
            <p className="text-sm text-base-content/70 mb-2 line-clamp-2">
              {truncateContent(post.content, 100)}
            </p>
            <div className="flex items-center text-xs text-base-content/60 space-x-2">
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <span>{estimatedReadTime} min read</span>
            </div>
          </div>
          {showActions && (
            <div className="flex items-center space-x-1 ml-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(post.id)}
                  className="p-1 text-base-content/60 hover:text-primary transition-colors"
                  title="Edit"
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
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="bg-base-100 rounded-lg shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-shadow">
        {post.imageUrl && (
          <div className="aspect-video relative">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  post.published
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-bold text-base-content line-clamp-2 flex-1">
              {post.title}
            </h2>
            {!post.imageUrl && (
              <span
                className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  post.published
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            )}
          </div>

          <p className="text-base-content/70 mb-4 line-clamp-3">
            {truncateContent(post.content, 200)}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-base-content/60 space-x-4">
              <span>By {post.author.name}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <span>{estimatedReadTime} min read</span>
            </div>

            {showActions && (
              <div className="flex items-center space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(post.id)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-base-content bg-base-200 border border-base-300 rounded-md hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
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
                  </button>
                )}
                {onTogglePublish && (
                  <button
                    onClick={() => onTogglePublish(post.id, post.published)}
                    className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      post.published
                        ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500"
                        : "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
                    }`}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(post.id)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-base-100 rounded-lg p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-base-content line-clamp-1 flex-1">
              {post.title}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                post.published
                  ? "bg-success/20 text-success"
                  : "bg-warning/20 text-warning"
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
            <span>{formatDate(post.createdAt)}</span>
            {post.updatedAt !== post.createdAt && (
              <>
                <span>•</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
            <span>•</span>
            <span>{estimatedReadTime} min read</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center space-x-2">
            {onEdit && (
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
            )}

            {onTogglePublish && (
              <button
                onClick={() => onTogglePublish(post.id, post.published)}
                className={`btn btn-sm ${
                  post.published ? "btn-warning" : "btn-success"
                }`}
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(post.id)}
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
            )}
          </div>
        )}
      </div>

      {post.imageUrl && (
        <div className="mt-4">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}
