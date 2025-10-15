import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { pbkdf2Sync } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Find user by email
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Hash the provided password with the same method used during registration
    const salt = email; // Using email as salt (same as registration)
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      "sha512"
    ).toString("hex");

    // Compare hashed passwords
    if (hashedPassword !== foundUser.password) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Return user info (excluding password)
    const userResponse = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: userResponse,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
