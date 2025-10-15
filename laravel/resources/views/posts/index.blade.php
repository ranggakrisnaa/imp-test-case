@extends('layouts.app')

@section('title', 'Posts')

@section('content')
<div class="container mx-auto px-4 py-8" x-data="postsPage()">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
            <h1 class="text-2xl font-bold text-base-content">Posts</h1>
            <p class="text-base-content/70">Manage all your blog posts here</p>
        </div>
        <a href="{{ route('posts.create') }}" class="btn btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Post
        </a>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg shadow p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Search</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Search posts..." 
                    class="input input-bordered"
                    x-model="searchQuery"
                    @input="filterPosts()"
                >
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Filter by status</span>
                </label>
                <select class="select select-bordered" x-model="filter" @change="filterPosts()">
                    <option value="all">All Posts</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Posts Grid -->
    <div x-show="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template x-for="i in 6">
            <div class="bg-base-100 rounded-lg shadow-lg animate-pulse">
                <div class="p-6">
                    <div class="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
                    <div class="h-3 bg-base-300 rounded w-full mb-2"></div>
                    <div class="h-3 bg-base-300 rounded w-2/3 mb-4"></div>
                    <div class="flex justify-between items-center">
                        <div class="h-6 bg-base-300 rounded w-16"></div>
                        <div class="h-8 bg-base-300 rounded w-20"></div>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <div x-show="!loading && filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template x-for="post in filteredPosts" :key="post.id">
            <div class="bg-base-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <h3 class="text-lg font-semibold text-base-content line-clamp-2" x-text="post.title"></h3>
                        <div class="flex items-center space-x-1">
                            <span x-show="post.published" class="badge badge-success badge-sm">Published</span>
                            <span x-show="!post.published" class="badge badge-warning badge-sm">Draft</span>
                        </div>
                    </div>
                    
                    <p class="text-base-content/70 text-sm mb-4 line-clamp-3" x-text="truncateContent(post.content)"></p>
                    
                    <div class="flex items-center justify-between text-xs text-base-content/50 mb-4">
                        <span x-text="formatDate(post.created_at)"></span>
                        <span x-text="post.author.name"></span>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <a :href="`/posts/${post.id}/edit`" class="btn btn-ghost btn-xs">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </a>
                            <a :href="`/posts/${post.id}`" class="btn btn-ghost btn-xs">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </a>
                        </div>
                        
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </div>
                            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                    <button @click="togglePublished(post)" class="text-left">
                                        <span x-text="post.published ? 'Unpublish' : 'Publish'"></span>
                                    </button>
                                </li>
                                <li>
                                    <button @click="confirmDelete(post.id)" class="text-left text-error">
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <div x-show="!loading && filteredPosts.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-medium text-base-content/70 mb-2">No posts found</h3>
        <p class="text-base-content/50 mb-4">
            <span x-show="searchQuery || filter !== 'all'">Try adjusting your search or filter.</span>
            <span x-show="!searchQuery && filter === 'all'">Create your first blog post to get started.</span>
        </p>
        <a href="{{ route('posts.create') }}" class="btn btn-primary">
            Create Post
        </a>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" :class="{ 'modal-open': deleteConfirm }">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Confirm Delete</h3>
            <p class="py-4">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div class="modal-action">
                <button class="btn" @click="deleteConfirm = null">Cancel</button>
                <button class="btn btn-error" @click="deletePost()">Delete</button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
function postsPage() {
    return {
        loading: true,
        posts: [],
        filteredPosts: [],
        searchQuery: '',
        filter: 'all',
        deleteConfirm: null,

        async init() {
            await this.fetchPosts();
        },

        async fetchPosts() {
            try {
                const response = await fetch('/api/posts', {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json',
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    this.posts = data.posts || [];
                    this.filterPosts();
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                this.loading = false;
            }
        },

        filterPosts() {
            let filtered = [...this.posts];

            if (this.filter !== 'all') {
                const isPublished = this.filter === 'published';
                filtered = filtered.filter(post => post.published === isPublished);
            }

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(post => 
                    post.title.toLowerCase().includes(query) ||
                    post.content.toLowerCase().includes(query)
                );
            }

            this.filteredPosts = filtered;
        },

        async togglePublished(post) {
            try {
                const response = await fetch(`/api/posts/${post.id}/toggle-published`, {
                    method: 'PATCH',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    post.published = !post.published;
                    this.filterPosts();
                }
            } catch (error) {
                console.error('Error toggling post status:', error);
            }
        },

        confirmDelete(postId) {
            this.deleteConfirm = postId;
        },

        async deletePost() {
            try {
                const response = await fetch(`/api/posts/${this.deleteConfirm}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json',
                    }
                });

                if (response.ok) {
                    this.posts = this.posts.filter(post => post.id !== this.deleteConfirm);
                    this.filterPosts();
                    this.deleteConfirm = null;
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        truncateContent(content) {
            return content.length > 150 ? content.substring(0, 150) + '...' : content;
        }
    }
}
</script>
@endpush
@endsection