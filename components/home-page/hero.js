import Image from "next/image";

import classes from "./hero.module.css";

// const prefix = "/next-blog";
const imagePath = `/images/site/max.webp`;

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={imagePath}
          alt="An image showing Max"
          width={300}
          height={300}
          quality={75}
          loading="lazy"
        />
      </div>
      <h1>Hi, I`m Max</h1>
      <p>
        I blog about web development frontend frameworks like Angular or React.
      </p>
    </section>
  );
}
