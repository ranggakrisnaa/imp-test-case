@extends('layouts.app')

@section('title', 'Create Post')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-2xl font-bold text-base-content">Create New Post</h1>
                <p class="text-base-content/70">Write and publish your blog post</p>
            </div>
            <a href="{{ route('posts.index') }}" class="btn btn-ghost">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Posts
            </a>
        </div>

        <!-- Form -->
        <div class="bg-base-100 rounded-lg shadow-lg p-8">
            <form method="POST" action="{{ route('posts.store') }}" class="space-y-6">
                @csrf
                
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Title</span>
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        value="{{ old('title') }}"
                        class="input input-bordered @error('title') input-error @enderror" 
                        placeholder="Enter post title..."
                        required
                    >
                    @error('title')
                        <label class="label">
                            <span class="label-text-alt text-error">{{ $message }}</span>
                        </label>
                    @enderror
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Content</span>
                    </label>
                    <textarea 
                        name="content" 
                        class="textarea textarea-bordered min-h-96 @error('content') textarea-error @enderror"
                        placeholder="Write your post content here..."
                        required
                    >{{ old('content') }}</textarea>
                    @error('content')
                        <label class="label">
                            <span class="label-text-alt text-error">{{ $message }}</span>
                        </label>
                    @enderror
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Image URL</span>
                        <span class="label-text-alt">Optional</span>
                    </label>
                    <input 
                        type="url" 
                        name="image_url" 
                        value="{{ old('image_url') }}"
                        class="input input-bordered @error('image_url') input-error @enderror" 
                        placeholder="https://example.com/image.jpg"
                    >
                    @error('image_url')
                        <label class="label">
                            <span class="label-text-alt text-error">{{ $message }}</span>
                        </label>
                    @enderror
                </div>

                <div class="form-control">
                    <label class="cursor-pointer label">
                        <span class="label-text font-semibold">Publish immediately</span>
                        <input 
                            type="checkbox" 
                            name="published" 
                            value="1"
                            class="checkbox checkbox-primary"
                            {{ old('published') ? 'checked' : '' }}
                        >
                    </label>
                    <label class="label">
                        <span class="label-text-alt text-base-content/60">
                            If unchecked, the post will be saved as a draft
                        </span>
                    </label>
                </div>

                <div class="flex items-center justify-between pt-6 border-t border-base-300">
                    <a href="{{ route('posts.index') }}" class="btn btn-ghost">
                        Cancel
                    </a>
                    <div class="flex items-center space-x-3">
                        <button type="submit" name="published" value="0" class="btn btn-outline">
                            Save as Draft
                        </button>
                        <button type="submit" name="published" value="1" class="btn btn-primary">
                            Publish Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection