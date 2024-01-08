"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import Tiptap from "@components/tiptap/Tiptap";
import Loader from "@components/loader/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface PostDetails {
  title: string;
  excerpt: string;
  text: string;
  date: string;
  imageUrl: string;
  isFeatured: boolean;
}

export interface FormValues {
  title: string;
  excerpt: string;
  text: string;
  date: string;
  image: FileList;
  isFeatured: boolean;
}

export default function AddNewPost() {
  const [loading, setLoading] = useState(false);

  const sendPostData = async (postDetails: PostDetails) => {
    const resposnse = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resposnse.ok) {
      const data = await resposnse.json();
      toast.error(data.message || "Something went wrong");
    }
  };

  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Hey the Title is not long enough" })
      .max(100, { message: "It's too long" })
      .trim(),
    excerpt: z
      .string()
      .min(5, { message: "Hey the Excerpt is not long enough" })
      .max(100, { message: "It's too long" })
      .trim(),
    text: z
      .string()
      .min(5, { message: "Hey the Post text is not long enough" })
      .max(100, { message: "It's too long" })
      .trim(),
    date: z.date(),
    isFeatured: z.boolean(),
    image: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      excerpt: "",
      text: "",
      date: undefined,
      isFeatured: false,
    },
  });

  //Stored FormData (1)
  //Сохраняем значения в localStorage
  // const watchedFields = form.watch([
  //   "title",
  //   "excerpt",
  //   "text",
  //   "date",
  //   "isFeatured",
  //   "image",
  // ]);

  // useEffect(() => {
  //   localStorage.setItem("formData", JSON.stringify(watchedFields));
  // }, [watchedFields]);

  //Stored FormData (2)
  // Получаем значения из localStorage при загрузке компонента
  // useEffect(() => {
  //   const storedData = localStorage.getItem("formData");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     Object.keys(parsedData).forEach((key) =>
  //       form.setValue(key, parsedData[key])
  //     );
  //   }
  // }, [form.setValue, form]);

  async function handleSubmit(values: any) {
    setLoading(true);

    //upload to Cloudinary
    try {
      const raw_image = values.image[0];

      const formData = new FormData();
      formData.append("file", raw_image);
      formData.append("upload_preset", "nextBlogPostsPreset");

      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.cloudinary_cloud_name}/image/upload`;
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      if (!uploadResponse.ok) {
        toast.error("Image upload faild");
        setLoading(false);
        return;
      }
      const imageData = await uploadResponse.json();
      const imageUrl = imageData.secure_url;

      //Stored to MongoDb
      const postData = {
        ...values,
        image: imageUrl,
      };
      try {
        await sendPostData(postData);
        form.reset();
        setLoading(false);
        toast.success(`New post ${values.title} successfully stored`);
      } catch (error: any) {
        (error as Error).message || "Upload image error";
      }
    } catch (error: any) {
      (error as Error).message || "Upload image error";
    }
  }

  return (
    <div className="p-24">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Add a new Post
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>Post Title</Label>
                <FormControl>
                  <Input type="text" placeholder="Post Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <Label>Post Excerpt</Label>
                <FormControl>
                  <Input type="text" placeholder="Post Excerpt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <Label>Post Text</Label>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <Label>Post Date</Label>
                <FormControl>
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="d MMM yyyy"
                    minDate={new Date()}
                    todayButton="Today"
                    shouldCloseOnSelect
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem>
                <Label>Is Featured ?</Label>
                <FormControl>
                  <Input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    value="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <Label>Post Image</Label>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {loading ? (
              <Button className="my-4" disabled type="submit">
                Submit
              </Button>
            ) : (
              <Button className="my-4" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
      {loading === true && <Loader color="#000000" />}
    </div>
  );
}
