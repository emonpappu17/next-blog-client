/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';
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

const BlogDetailsPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    // console.log(await params);
    const { blogId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`)

    const blog = await res.json();
    // console.log(blog);
    return (
        <div className='py-30 px-4 max-w-7xl mx-auto'>
            <BlogDetailsCard blog={blog}></BlogDetailsCard>
        </div>
    );
};

export default BlogDetailsPage;