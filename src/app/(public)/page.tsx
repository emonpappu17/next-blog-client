/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    next: {
      // revalidate: 30   // isr
      tags: ["BLOGS"]
    }
  });
  const { data: blogs } = await res.json();
  // console.log(blogs);
  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="grid grid-cols-3 gap-5 max-w-6xl mx-auto my-5">
        {
          blogs?.slice(0, 3).map((blog: any) => (
            <BlogCard key={blog?.id} post={blog}></BlogCard>
          ))
        }
      </div>
    </div>
  );
}
