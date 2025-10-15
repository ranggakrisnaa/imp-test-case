import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    // Ensure we have a user in the database and get the first user
    let user = await prisma.user.findFirst();
    if (!user) {
      // Create a demo user if none exists
      user = await prisma.user.create({
        data: {
          id: "mock-user-id",
          email: "demo@example.com",
          name: "Demo User",
          password: "hashed-password", // This would be properly hashed in real app
        },
      });
    }

    const authorId = user.id;

    // Get total posts count
    const totalPosts = await prisma.post.count({
      where: {
        authorId: authorId,
      },
    });

    // Get published posts count
    const publishedPosts = await prisma.post.count({
      where: {
        authorId: authorId,
        published: true,
      },
    });

    // Get draft posts count
    const draftPosts = await prisma.post.count({
      where: {
        authorId: authorId,
        published: false,
      },
    });

    // Get recent posts (last 5)
    const recentPosts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return new Response(
      JSON.stringify({
        totalPosts,
        publishedPosts,
        draftPosts,
        recentPosts,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
