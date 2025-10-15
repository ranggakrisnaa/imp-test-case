import { PostCard } from "../molecules/PostCard";

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

interface PostListProps {
  posts: Post[];
  loading?: boolean;
  variant?: "default" | "compact" | "featured";
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePublish?: (id: string, currentStatus: boolean) => void;
  emptyMessage?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}

export function PostList({
  posts,
  loading = false,
  variant = "default",
  showActions = false,
  onEdit,
  onDelete,
  onTogglePublish,
  emptyMessage = "No posts found",
  emptyDescription = "There are no posts to display.",
  emptyAction,
}: PostListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-base-100 rounded-lg p-6 shadow-lg animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-6 bg-base-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-2/3 mb-3"></div>
                <div className="h-3 bg-base-300 rounded w-1/2"></div>
              </div>
              {showActions && (
                <div className="flex space-x-2 ml-4">
                  <div className="h-8 w-16 bg-base-300 rounded"></div>
                  <div className="h-8 w-16 bg-base-300 rounded"></div>
                  <div className="h-8 w-16 bg-base-300 rounded"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-base-100 rounded-lg shadow-lg p-8 text-center">
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
          {emptyMessage}
        </h3>
        <p className="text-base-content/50 mb-4">{emptyDescription}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className={`space-y-${variant === "compact" ? "3" : "6"}`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          variant={variant}
          showActions={showActions}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePublish={onTogglePublish}
        />
      ))}
    </div>
  );
}
