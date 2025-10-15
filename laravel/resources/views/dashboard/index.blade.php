@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="container mx-auto px-4 py-8" x-data="dashboard()">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg text-white p-8 mb-8">
        <h1 class="text-3xl font-bold mb-2">Welcome back, {{ auth()->user()->name ?? auth()->user()->email }}!</h1>
        <p class="text-blue-100">Here's an overview of your blog activity.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Posts -->
        <div class="bg-base-100 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-base-content/70">Total Posts</h3>
                    <p class="text-2xl font-bold" x-text="stats.totalPosts">
                        <span x-show="loading" class="loading loading-spinner loading-sm"></span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Published Posts -->
        <div class="bg-base-100 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-base-content/70">Published</h3>
                    <p class="text-2xl font-bold" x-text="stats.publishedPosts">
                        <span x-show="loading" class="loading loading-spinner loading-sm"></span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Draft Posts -->
        <div class="bg-base-100 rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-base-content/70">Drafts</h3>
                    <p class="text-2xl font-bold" x-text="stats.draftPosts">
                        <span x-show="loading" class="loading loading-spinner loading-sm"></span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Posts Section -->
    <div class="bg-base-100 rounded-lg shadow-lg">
        <div class="p-6 border-b border-base-300">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">Recent Posts</h2>
                <a href="{{ route('posts.index') }}" class="btn btn-primary btn-sm">
                    View All
                </a>
            </div>
        </div>

        <div class="p-6">
            <div x-show="loading" class="space-y-4">
                <template x-for="i in 3">
                    <div class="animate-pulse">
                        <div class="flex items-start space-x-4">
                            <div class="h-12 w-12 bg-base-300 rounded"></div>
                            <div class="flex-1 space-y-2">
                                <div class="h-4 bg-base-300 rounded w-3/4"></div>
                                <div class="h-3 bg-base-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div x-show="!loading && stats.recentPosts.length > 0" class="space-y-4">
                <template x-for="post in stats.recentPosts" :key="post.id">
                    <div class="flex items-start justify-between p-4 border border-base-300 rounded-lg hover:bg-base-50 transition-colors">
                        <div class="flex-1">
                            <h3 class="font-semibold text-base-content" x-text="post.title"></h3>
                            <p class="text-sm text-base-content/60 mt-1" x-text="truncateContent(post.content)"></p>
                            <div class="flex items-center space-x-4 mt-2">
                                <span class="text-xs text-base-content/50" x-text="formatDate(post.created_at)"></span>
                                <span x-show="post.published" class="badge badge-success badge-xs">Published</span>
                                <span x-show="!post.published" class="badge badge-warning badge-xs">Draft</span>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 ml-4">
                            <a :href="`/posts/${post.id}/edit`" class="btn btn-ghost btn-xs">
                                Edit
                            </a>
                            <a :href="`/posts/${post.id}`" class="btn btn-ghost btn-xs">
                                View
                            </a>
                        </div>
                    </div>
                </template>
            </div>

            <div x-show="!loading && stats.recentPosts.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="text-lg font-medium text-base-content/70 mb-2">No posts yet</h3>
                <p class="text-base-content/50 mb-4">Create your first blog post to get started.</p>
                <a href="{{ route('posts.create') }}" class="btn btn-primary">
                    Create Post
                </a>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <a href="{{ route('posts.create') }}" class="bg-base-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <div class="ml-4">
                    <h3 class="font-semibold">Create New Post</h3>
                    <p class="text-sm text-base-content/70">Write a new blog post</p>
                </div>
            </div>
        </a>

        <a href="{{ route('posts.index') }}" class="bg-base-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H3a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
                    </svg>
                </div>
                <div class="ml-4">
                    <h3 class="font-semibold">Manage Posts</h3>
                    <p class="text-sm text-base-content/70">View and edit all your posts</p>
                </div>
            </div>
        </a>
    </div>
</div>

@push('scripts')
<script>
function dashboard() {
    return {
        loading: true,
        stats: {
            totalPosts: 0,
            publishedPosts: 0,
            draftPosts: 0,
            recentPosts: []
        },

        async init() {
            await this.fetchStats();
        },

        async fetchStats() {
            try {
                const response = await fetch('/api/dashboard/stats', {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json',
                    }
                });
                
                if (response.ok) {
                    this.stats = await response.json();
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                this.loading = false;
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
            return content.length > 100 ? content.substring(0, 100) + '...' : content;
        }
    }
}
</script>
@endpush
@endsection