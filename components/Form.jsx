import Link from "next/link";
import DatePicker from "react-datepicker";
import Tiptap from "./Tiptap";

import "react-datepicker/dist/react-datepicker.css";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient"> {type}Post</span>
      </h1>
      <p className="max-w-md text-left desc">
        {type} and share amaizing posts in the World and let your imagination
        run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full mt-10 max-w2x1 gap-7 glassmorphism"
      >
        <span className="text-base font-semibold text-gray-700 font-satoshi">
          Your Post
        </span>
        <input
          value={post.title}
          onChange={(e) => {
            setPost({ ...post, title: e.target.value });
          }}
          placeholder="Write Post title here..."
          required
          className="form_input"
        />
        <textarea
          value={post.excerpt}
          onChange={(e) => {
            setPost({ ...post, excerpt: e.target.value });
          }}
          placeholder="Write Post excerpt here..."
          required
          className="form_excerpt"
        />
        <Tiptap post={post} setPost={setPost} />
        {/* <textarea
          value={post.text}
          onChange={(e) => {
            setPost({ ...post, text: e.target.value });
          }}
          placeholder="Write your Post text here..."
          required
          className="form_textarea"
        /> */}
        <div className="flex flex-row items-center justify-between">
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => {
              setPost({ ...post, date: date });
            }}
            selected={post.date}
            dateFormat="d MMM yyyy"
            minDate={new Date()}
            todayButton="Today"
            shouldCloseOnSelect
            className="basis-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-blue-500"
          />
          <label className="flex items-center">
            <p className="w-44"> Is Featued?</p>
            <input
              type="checkbox"
              value={post.isFeatured}
              onChange={(e) => {
                setPost({ ...post, isFeatured: e.target.checked });
              }}
              placeholder="Write Post title here..."
              checked={post.value}
              className="form_input"
            />
          </label>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setPost({ ...post, image: e.target.files[0] });
          }}
          required
          className="form_input"
        />
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
