"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would check for user session/token
    // For demo purposes, we'll assume user is logged in if they have visited before
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-base-200 via-base-300 to-blue-900 bg-indigo-900">
      {/* Floating Navbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {user && (
          <Link href="/dashboard" className="btn btn-primary btn-sm">
            Dashboard
          </Link>
        )}
      </div>

      {/* Hero Section */}
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-3xl flex flex-col gap-10 items-center">
            {/* Animated Badge */}
            <div className="inline-block mb-4">
              <span className="bg-blue-900 rounded-md !p-3 gap-5 animate-pulse text-2xl">
                ✨ New Platform
              </span>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Blog Space
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl mb-4 text-base-content/80 font-light">
              Your ideas deserve a beautiful home
            </p>
            <p className="text-lg mb-8 text-base-content/70 max-w-2xl text-center mx-auto">
              Create, share, and manage your posts with our intuitive platform.
              Join a community of writers and storytellers sharing their passion
              with the world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="shadow-lg hover:btn-primary transition-all duration-300 w-full sm:w-auto">
                <Link href={user ? "/dashboard/posts/create" : "/register"}>
                  <button className="btn w-[180px] bg-gray-900 border-sky-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Start Writing
                  </button>
                </Link>
              </div>

              <div className="shadow-lg hover:btn-primary transition-all duration-300 sm:w-auto">
                {isLoading ? (
                  <button
                    className="btn w-[180px] bg-gradient-to-tr from-indigo-800 to-pink-500"
                    disabled
                  >
                    <span className="loading loading-spinner loading-sm"></span>
                    Loading...
                  </button>
                ) : user ? (
                  <Link href="/dashboard">
                    <button className="btn w-[180px] bg-gradient-to-tr from-indigo-800 to-pink-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Hi, {user.name.split(" ")[0]}!
                    </button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <button className="btn w-[180px] bg-gradient-to-tr from-indigo-800 to-pink-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
                        />
                      </svg>
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
