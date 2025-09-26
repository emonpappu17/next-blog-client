"use server"

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
    // console.log({ ...data, authorId: 1 });
    const session = await getUserSession();
    const blogInfo = Object.fromEntries(data.entries());
    const modifiedData = {
        ...blogInfo,
        authorId: session?.user?.id,
        // authorId: 1,
        tags: blogInfo.tags
            .toString()
            .split(",")
            .map((tag) => tag.trim()),
        isFeatured: Boolean(blogInfo.isFeatured)
    }

    // console.log(modifiedData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(modifiedData)
    })

    const result = await res.json();
    if (result?.id) {
        revalidateTag("BLOGS")
        revalidatePath("/blogs") // na dileo hobe amne tei ssr hoitase 
        redirect('/');
        // redirect('/blogs');
    }
    return result;
    // console.log(blogInfo);
}