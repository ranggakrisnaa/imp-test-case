<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
    /**
     * Display a listing of posts
     */
    public function index(Request $request)
    {
        try {
            $query = Post::with('author:id,name');

            // Filter by published status
            if ($request->has('published') && $request->published !== null) {
                $published = filter_var($request->published, FILTER_VALIDATE_BOOLEAN);
                $query->where('published', $published);
            }

            // Filter by author
            if ($request->has('author_id') && $request->author_id) {
                $query->where('author_id', $request->author_id);
            }

            // Pagination
            $limit = min($request->get('limit', 10), 50);
            $offset = $request->get('offset', 0);

            $total = $query->count();
            $posts = $query->orderBy('created_at', 'desc')
                          ->offset($offset)
                          ->limit($limit)
                          ->get();

            if ($request->expectsJson()) {
                return response()->json([
                    'posts' => $posts,
                    'pagination' => [
                        'total' => $total,
                        'limit' => $limit,
                        'offset' => $offset,
                        'hasMore' => $offset + $limit < $total,
                    ],
                ]);
            }

            return view('posts.index', compact('posts', 'total'));

        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Internal server error',
                ], 500);
            }
            return back()->with('error', 'Failed to load posts.');
        }
    }

    /**
     * Show the form for creating a new post
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created post
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image_url' => 'nullable|url',
                'published' => 'boolean',
            ]);

            // Get current user or create demo user for API requests
            $user = Auth::user();
            if (!$user) {
                $user = User::firstOrCreate(
                    ['email' => 'demo@example.com'],
                    [
                        'name' => 'Demo User',
                        'password' => bcrypt('password'),
                    ]
                );
            }

            $post = Post::create([
                'title' => trim($validated['title']),
                'content' => trim($validated['content']),
                'image_url' => isset($validated['image_url']) ? trim($validated['image_url']) : null,
                'published' => $validated['published'] ?? false,
                'author_id' => $user->id,
            ]);

            $post->load('author:id,name');

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post created successfully',
                    'post' => $post,
                ], 201);
            }

            return redirect()->route('posts.index')->with('success', 'Post created successfully!');

        } catch (ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Internal server error',
                ], 500);
            }
            return back()->with('error', 'Failed to create post.')->withInput();
        }
    }

    /**
     * Display the specified post
     */
    public function show(Request $request, string $id)
    {
        try {
            $post = Post::with('author:id,name')->findOrFail($id);

            if ($request->expectsJson()) {
                return response()->json(['post' => $post]);
            }

            return view('posts.show', compact('post'));

        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }
            return redirect()->route('posts.index')->with('error', 'Post not found.');
        }
    }

    /**
     * Show the form for editing the specified post
     */
    public function edit(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            return view('posts.edit', compact('post'));
        } catch (\Exception $e) {
            return redirect()->route('posts.index')->with('error', 'Post not found.');
        }
    }

    /**
     * Update the specified post
     */
    public function update(Request $request, string $id)
    {
        try {
            $post = Post::findOrFail($id);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image_url' => 'nullable|url',
                'published' => 'boolean',
            ]);

            $post->update([
                'title' => trim($validated['title']),
                'content' => trim($validated['content']),
                'image_url' => isset($validated['image_url']) ? trim($validated['image_url']) : null,
                'published' => $validated['published'] ?? $post->published,
            ]);

            $post->load('author:id,name');

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post updated successfully',
                    'post' => $post,
                ]);
            }

            return redirect()->route('posts.index')->with('success', 'Post updated successfully!');

        } catch (ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }
            return back()->with('error', 'Failed to update post.')->withInput();
        }
    }

    /**
     * Toggle published status of the specified post
     */
    public function togglePublished(Request $request, string $id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->update(['published' => !$post->published]);
            $post->load('author:id,name');

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post status updated successfully',
                    'post' => $post,
                ]);
            }

            return redirect()->route('posts.index')->with('success', 'Post status updated successfully!');

        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }
            return back()->with('error', 'Failed to update post status.');
        }
    }

    /**
     * Remove the specified post
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post deleted successfully',
                ]);
            }

            return redirect()->route('posts.index')->with('success', 'Post deleted successfully!');

        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }
            return back()->with('error', 'Failed to delete post.');
        }
    }
}