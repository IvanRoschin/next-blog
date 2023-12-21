import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";

export default function HomePage() {
  const DUMMY_POSTS = [
    {
      slug: "getting-started-with-nextjs",
      title: "Getting started width NextJS",
      image: "getting-started-nextjs.webp",
      excerpt:
        "NextJS is framework for production - it's make fullstack React apps rize",
      date: "2022-10-02",
    },
    {
      slug: "getting-started-with-nextjs2",
      title: "Getting started width NextJS",
      image: "getting-started-nextjs.webp",
      excerpt:
        "NextJS is framework for production - it's make fullstack React app ",
      date: "2022-10-02",
    },
    {
      slug: "getting-started-with-nextjs3",
      title: "Getting started width NextJS",
      image: "getting-started-nextjs.webp",
      excerpt:
        "NextJS is framework for production - it's make fullstack React app ",
      date: "2022-10-02",
    },
    {
      slug: "getting-started-with-nextjs4",
      title: "Getting started width NextJS",
      image: "getting-started-nextjs.webp",
      excerpt:
        "NextJS is framework for production - it's make fullstack React app ",
      date: "2022-10-02",
    },
  ];
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}
