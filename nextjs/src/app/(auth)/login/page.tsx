"use client";

import { FormLogin } from "@/components/organism/FormLogin";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-base-200 via-base-300 to-blue-900 bg-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-100 text-center">
            {successMessage}
          </div>
        )}

        {/* Card Container */}
        <div className="bg-base-100/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-base-content/70">
              Login to continue to Blog Space
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-5">
            <FormLogin />
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-base-content/70">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>{" "}
          </p>
          {/* divider */}
          <div className="divider">OR</div>
          <p className="text-base-content/70">
            Return to{" "}
            <Link
              href="/"
              className="text-primary font-semibold hover:underline"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
