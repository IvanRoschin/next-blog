"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import formatedDate from "@utils/formatedDate";

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const date = formatedDate(post.date);

  const title = post.title;
  const path = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="prompt_card ">
      <Link href={`/post/${path}`} className="cursor-pointer">
        <div className="flex items-start justify-between gap-5">
          <div className="gap-3 cursor-pointer ">
            <Image
              src={post.image}
              alt="post_image"
              width={360}
              height={360}
              className="pb-3 full-w"
            />
            <div className="flex flex-col text-center">
              <h3 className="font-semibold font-satoshi text-gray:900">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 font-inter">{date}</p>
            </div>
          </div>
        </div>
        <p className="my-4 text-sm font-satoshi text-grey-700">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-sm cursor-pointer font-inter blue_gradient"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >
            #{post.tag}
          </p>
          <div className="flex flex-col items-end text-sm">
            <h3 className="font-semibold font-satoshi text-gray:900">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500 font-inter">
              {post.creator.email}
            </p>
          </div>
        </div>
      </Link>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="gap-4 pt-3 border-t border-gray-100 flex-center tm-5">
          <p
            className="text-sm cursor-pointer font-inter green_gradient"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm cursor-pointer font-inter orange_gradient"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
