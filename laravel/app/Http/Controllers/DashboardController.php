<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the dashboard
     */
    public function index(Request $request)
    {
        try {
            $stats = $this->getDashboardStats();

            if ($request->expectsJson()) {
                return response()->json($stats);
            }

            return view('dashboard.index', compact('stats'));

        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Internal server error',
                ], 500);
            }
            return view('dashboard.index', ['stats' => $this->getEmptyStats()]);
        }
    }

    /**
     * Get dashboard statistics (API endpoint)
     */
    public function stats(Request $request)
    {
        try {
            $stats = $this->getDashboardStats();
            return response()->json($stats);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Internal server error',
            ], 500);
        }
    }

    /**
     * Get dashboard statistics data
     */
    private function getDashboardStats()
    {
        // Get current user or create/get demo user
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

        $authorId = $user->id;

        // Get total posts count
        $totalPosts = Post::where('author_id', $authorId)->count();

        // Get published posts count
        $publishedPosts = Post::where('author_id', $authorId)
                             ->where('published', true)
                             ->count();

        // Get draft posts count
        $draftPosts = Post::where('author_id', $authorId)
                         ->where('published', false)
                         ->count();

        // Get recent posts (last 5)
        $recentPosts = Post::where('author_id', $authorId)
                          ->with('author:id,name')
                          ->orderBy('created_at', 'desc')
                          ->take(5)
                          ->get();

        return [
            'totalPosts' => $totalPosts,
            'publishedPosts' => $publishedPosts,
            'draftPosts' => $draftPosts,
            'recentPosts' => $recentPosts,
        ];
    }

    /**
     * Get empty stats structure
     */
    private function getEmptyStats()
    {
        return [
            'totalPosts' => 0,
            'publishedPosts' => 0,
            'draftPosts' => 0,
            'recentPosts' => [],
        ];
    }
}