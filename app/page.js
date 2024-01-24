import Feed from "@/components/Feed";
import Image from "next/image";

const Home = () => {
  return (
    <section className="flex-col w-full flex-center">
      <Image
        src="/assets/images/max.webp"
        alt="Max"
        className="w-64 rounded-full h-72"
        width={200}
        height={200}
      />
      <h1 className="text-center head_text">
        Hi, I'm Max
        <br className="max-md:hidden" />
        <span className="text-center orange_gradient"></span>
      </h1>
      <p className="text-center desc">
        I blog about web development - especially
        <br />
        frontend frameworks like Angular or React
      </p>
      <Feed />
    </section>
  );
};

export default Home;
