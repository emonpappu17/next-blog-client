/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';
import { getBlogById } from '@/services/PostServies';
import React from 'react';

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`)
    const { data: blogs } = await res.json();

    return blogs.slice(0, 2).map((blog: any) => (
        {
            blogId: String(blog.id)
        }
    ))
    // return [
    //     {
    //         blogId: "1"
    //     }
    // ]
}

export const generateMetadata = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`)
    // const blog = await res.json();
    const blog = await getBlogById(blogId);

    return {
        title: blog?.title,
        description: blog?.content
    }
}

const BlogDetailsPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    // console.log(await params);
    const { blogId } = await params;
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`)
    // const blog = await res.json();
    // console.log(blog);

    const blog = await getBlogById(blogId);

    return (
        <div className='py-30 px-4 max-w-7xl mx-auto'>
            <BlogDetailsCard blog={blog}></BlogDetailsCard>
        </div>
    );
};

export default BlogDetailsPage;