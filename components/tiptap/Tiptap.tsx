"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Toolbar } from "./ToolBar";
import { Color } from "@tiptap/extension-color";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: any;
}) {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Underline,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-back disabled:cursor-not-allowed disabled opacity-50 ring-offset-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="text-editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

// className = "flex flex-col justify-stretch min-h-[250px]";
