import CreateBlogForm from "@/components/modules/Blogs/CreateBlogForm";
import React from "react";

const CreateBlog = () => {
  // const create = async (data: FormData) => {
  //   "user server"
  //   console.log(object);
  // }
  return (
    <div className="w-full flex justify-center items-center">
      {/* <h1 className="text-center text-xl">Create Blog</h1> */}
      <CreateBlogForm></CreateBlogForm>
    </div>
  );
};

export default CreateBlog;
