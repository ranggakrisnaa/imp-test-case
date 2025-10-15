import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// GET /api/posts - Get all posts with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const authorId = searchParams.get("authorId");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {};

    if (published !== null) {
      where.published = published === "true";
    }

    if (authorId) {
      where.authorId = authorId;
    }

    const posts = await prisma.post.findMany({
      where,
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
      take: limit,
      skip: offset,
    });

    const total = await prisma.post.count({ where });

    return new Response(
      JSON.stringify({
        posts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      content,
      imageUrl,
      published,
      authorId: requestAuthorId,
    } = await request.json();

    // Validation
    if (!title || !content) {
      return new Response(
        JSON.stringify({ message: "Title and content are required" }),
        { status: 400 }
      );
    }

    // Ensure we have a user in the database
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

    const finalAuthorId = requestAuthorId || user.id;

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl?.trim() || null,
        published: published || false,
        authorId: finalAuthorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({ message: "Post created successfully", post }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
