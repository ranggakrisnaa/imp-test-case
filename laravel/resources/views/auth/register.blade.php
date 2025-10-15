@extends('layouts.app')

@section('title', 'Register')

@section('content')
<div class="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
        <div class="bg-base-100 shadow-xl rounded-lg p-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-base-content mb-6">
                    Create your account
                </h2>
            </div>
            
            <form method="POST" action="{{ route('register') }}" class="space-y-6">
                @csrf
                
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Full name</span>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        value="{{ old('name') }}"
                        class="input input-bordered @error('name') input-error @enderror" 
                        placeholder="John Doe"
                        required 
                        autofocus
                    >
                    @error('name')
                        <label class="label">
                            <span class="label-text-alt text-error">{{ $message }}</span>
                        </label>
                    @enderror
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email address</span>
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        value="{{ old('email') }}"
                        class="input input-bordered @error('email') input-error @enderror" 
                        placeholder="your@email.com"
                        required
                    >
                    @error('email')
                        <label class="label">
                            <span class="label-text-alt text-error">{{ $message }}</span>
                        </label>
                    @enderror
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        class="input input-bordered @error('password') input-error @enderror"
                        placeholder="••••••••"
                        required
                    >
                    @error('password')
                        <label class="label">
                            <span class="label-text-alt text-error">{{ $message }}</span>
                        </label>
                    @enderror
                </div>

                <div>
                    <button type="submit" class="btn btn-primary w-full">
                        Sign up
                    </button>
                </div>

                <div class="text-center">
                    <p class="text-sm text-base-content/60">
                        Already have an account?
                        <a href="{{ route('login') }}" class="link link-primary">
                            Sign in
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection