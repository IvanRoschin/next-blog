"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import fetchAllPosts from "@hooks/fetchPosts";
import formatedDate from "@utils/formatedDate";

const Post = ({ params }) => {
  const { allPosts, error } = fetchAllPosts();
  if (error) {
    return <div>Failed to load</div>;
  }
  if (!allPosts) {
    return <div>Loading...</div>;
  }
  const { slug } = params;

  const post = allPosts.find((post) => {
    const postPath = post.title.toLowerCase().replace(/\s+/g, "-");
    return postPath === slug;
  });

  const date = formatedDate(post.date);

  return (
    <div className="post ">
      <div className="flex items-start justify-between pb-4">
        <h2 className="text-lg font-semibold font-satoshi text-gray:900">
          {post.title}
        </h2>
        <div className="text-sm text-gray-500 font-inter">{date}</div>
      </div>
      <div className="">
        <Image
          src={post.image}
          alt="post_image"
          width={240}
          height={240}
          className="float-left mr-2"
        />
      </div>
      <p className="pb-4 text-lg text-justify cursor-text">{post.text}</p>
      <div className="flex items-center justify-between">
        <p
          className="text-sm cursor-pointer font-inter blue_gradient"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        <div className="flex flex-col items-end text-sm">
          <h3 className="font-semibold font-satoshi text-gray:900">
            {post.creator?.username}
          </h3>
          <p className="text-sm text-gray-500 font-inter">
            {post.creator?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
