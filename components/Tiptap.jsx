"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { MenuBar } from "./TiptapMenuBar";

const Tiptap = ({ post, setPost }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setPost({ ...post, text: html });
      console.log(html);
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
