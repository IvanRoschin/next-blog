"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import uploadToCloudinary from "@utils/upload"; // Correct import
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    text: "",
    date: null,
    isFeatured: false,
    image: undefined,
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const file = post.image;
    if (!file) {
      console.log("No image selected");
      return;
    }
    try {
      const imageUrl = await uploadToCloudinary(file);

      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          image: imageUrl,
          userId: session?.user?.id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
