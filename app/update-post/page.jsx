"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import uploadToCloudinary from "@utils/upload";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

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

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost({
        title: data.title,
        excerpt: data.excerpt,
        text: data.text,
        tag: data.tag,
      });
    };
    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!postId) return alert("PostId not found");

    const file = post.image;
    if (!file) {
      console.log("No image selected");
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(file);

      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          excerpt: post.excerpt,
          text: post.text,
          date: post.date,
          isFeatured: post.isFeatured,
          image: imageUrl,
          tag: post.tag,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default EditPost;
