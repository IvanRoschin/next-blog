import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

export default function PostContent(props) {
  const { post } = props;
  // const prefix = "/next-blog";
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderer = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const metastring = image.properties.alt;
        const alt = image.properties.alt;
        const metaWidth = metastring.match(/{([^}]+)x/);
        const metaHeight = metastring.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : "600";
        const height = metaHeight ? metaHeight[1] : "300";
        const isPriority = metastring?.toLowerCase().match("{priority}");
        const src = `/images/posts/${post.slug}/${image.properties.src}`;

        return (
          <div className={classes.image}>
            <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
              priority={isPriority}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code({ language, children }) {
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </article>
  );
}
