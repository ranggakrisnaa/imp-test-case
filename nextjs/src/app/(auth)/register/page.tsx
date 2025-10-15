"use client";

import { FormRegister } from "@/components/organism/FormRegister";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-base-200 via-base-300 to-blue-900 bg-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-base-100/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-base-content/70">Join Blog Space today</p>
          </div>

          {/* Register Form */}
          <div className="space-y-5">
            <FormRegister />
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-base-content/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
