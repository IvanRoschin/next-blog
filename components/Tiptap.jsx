"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block";

import { MenuBar } from "./TiptapMenuBar";

const Tiptap = ({ value, post, setPost }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      CodeBlock.configure({
        languageClassPrefix: "language-",
      }),
    ],

    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setPost({ ...post, text: html });
    },
  });

  return (
    <div className="pb-5">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
