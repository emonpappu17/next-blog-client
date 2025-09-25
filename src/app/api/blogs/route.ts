import { NextResponse } from "next/server";

export const blogs = [
    {
        "title": "Getting Started with Next.js 15",
        "content": "In this post, we’ll explore how to set up a new Next.js 15 project, configure TypeScript, Tailwind, and deploy your first app to Vercel.",
        "thumbnail": "https://placehold.co/600x400?text=Next.js+15",
        "isFeatured": true,
        "tags": ["nextjs", "typescript", "tailwind", "vercel"],
        "views": 120,
        "authorId": 1,
        "id": 1
    },
    {
        "title": "Next.js App Router vs Pages Router",
        "content": "The App Router is the future of Next.js. Learn the key differences between App Router and Pages Router, including file structure, server components, and data fetching.",
        "thumbnail": "https://placehold.co/600x400?text=App+Router",
        "isFeatured": false,
        "tags": ["nextjs", "app-router", "react-server-components"],
        "views": 85,
        "authorId": 2
    },
    {
        "title": "Building a Blog with Next.js and Prisma",
        "content": "Prisma is an excellent ORM for working with databases in Next.js. Let’s build a full-stack blog with Prisma, PostgreSQL, and Next.js API routes.",
        "thumbnail": "https://placehold.co/600x400?text=Prisma+Blog",
        "isFeatured": true,
        "tags": ["nextjs", "prisma", "postgresql", "fullstack"],
        "views": 200,
        "authorId": 1
    },
    {
        "title": "Optimizing Images in Next.js",
        "content": "Next.js provides the <Image> component for image optimization. This article covers how to use it, remote patterns, and tips for performance.",
        "thumbnail": "https://placehold.co/600x400?text=Image+Optimization",
        "isFeatured": false,
        "tags": ["nextjs", "image", "performance"],
        "views": 64,
        "authorId": 3
    },
    {
        "title": "Authentication in Next.js with NextAuth.js",
        "content": "Learn how to add authentication and authorization in a Next.js app using NextAuth.js, including GitHub and Google OAuth providers.",
        "thumbnail": "https://placehold.co/600x400?text=NextAuth",
        "isFeatured": false,
        "tags": ["nextjs", "nextauth", "auth", "security"],
        "views": 150,
        "authorId": 2
    }
]


export const GET = async () => {
    return Response.json(blogs)
    // return Response.json({ message: "Hello next js api" })
}

export const POST = async (request: Request) => {
    const blog = await request.json();
    const newBlog = {
        ...blog,
        id: blogs.length + 1
    }
    blogs.push(newBlog)

    return new NextResponse(JSON.stringify(newBlog), {
        status: 201,
        headers: {
            "Content-type": "application/json"
        }
    })
}