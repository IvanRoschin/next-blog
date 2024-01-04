import Head from "next/head";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedPosts } from "@/pages/api/posts-util";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Welcome to my Blog </title>
        <meta
          name="description"
          content="I post about programming and development"
        ></meta>
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
