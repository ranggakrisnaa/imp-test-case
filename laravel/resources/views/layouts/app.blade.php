<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Laravel Blog')</title>
    
    <!-- Tailwind CSS and DaisyUI -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.19/dist/full.min.css" rel="stylesheet" type="text/css" />
    
    <!-- Alpine.js for interactivity -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    @stack('styles')
</head>
<body class="min-h-screen bg-base-200">
    
    @if(auth()->check())
        @include('components.navbar')
    @endif

    <main class="@if(auth()->check()) pt-16 @endif">
        <!-- Flash Messages -->
        @if(session('success'))
            <div class="alert alert-success mx-4 mt-4" x-data="{ show: true }" x-show="show" x-transition>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ session('success') }}</span>
                <button @click="show = false" class="btn btn-sm btn-ghost">✕</button>
            </div>
        @endif

        @if(session('error'))
            <div class="alert alert-error mx-4 mt-4" x-data="{ show: true }" x-show="show" x-transition>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ session('error') }}</span>
                <button @click="show = false" class="btn btn-sm btn-ghost">✕</button>
            </div>
        @endif

        @yield('content')
    </main>

    @stack('scripts')
</body>
</html>