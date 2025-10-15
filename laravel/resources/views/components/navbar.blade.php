<nav class="navbar bg-base-100 shadow-lg fixed top-0 z-50">
    <div class="flex-1">
        <a href="{{ route('dashboard') }}" class="btn btn-ghost text-xl">
            📝 Laravel Blog
        </a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a href="{{ route('dashboard') }}">Dashboard</a></li>
            <li><a href="{{ route('posts.index') }}">My Posts</a></li>
            <li>
                <details>
                    <summary>{{ auth()->user()->name ?? auth()->user()->email }}</summary>
                    <ul class="bg-base-100 rounded-t-none p-2 z-50 w-52">
                        <li>
                            <form method="POST" action="{{ route('logout') }}" class="w-full">
                                @csrf
                                <button type="submit" class="w-full text-left">Logout</button>
                            </form>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</nav>