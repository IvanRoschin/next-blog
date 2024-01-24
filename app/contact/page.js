"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/messages/new", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient"> How can I help you?</span>
      </h1>
      <p className="max-w-md text-left desc">Send me a message</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full mt-10 max-w2x1 gap-7 glassmorphism"
      >
        <input
          {...register("name", { required: true, maxLength: 20 })}
          placeholder="Name"
          className="form_input"
        />
        {errors.name && <p className="text-red-400"> Name is required.</p>}

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="form_input"
        />
        {errors.email && (
          <p className="text-red-400">Email address is required.</p>
        )}

        <input
          type="tel"
          autoComplete="tel"
          {...register("phone", { valueAsNumber: true })}
          placeholder="+380"
          className="form_input"
        />
        {errors.phone && <p className="text-red-400">Phone Number invalid </p>}

        <input
          type="text"
          {...register("text", { required: true })}
          placeholder="Your message"
          className="form_excerpt"
        />
        {errors.text && <p className="text-red-400">Message is required.</p>}
        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <input
            type="submit"
            className="px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white"
          />
        </div>
      </form>
    </section>
  );
};

export default Contact;
