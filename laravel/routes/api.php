<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public API routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected API routes (temporarily without auth middleware)
Route::post('/auth/logout', [AuthController::class, 'logout']);

// Dashboard routes
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Posts API routes
Route::apiResource('posts', PostController::class);
Route::patch('/posts/{id}/toggle-published', [PostController::class, 'togglePublished']);

// Public posts routes (for viewing published posts)
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);