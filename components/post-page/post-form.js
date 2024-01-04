import ReactDom from "react-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@components/loader/loader";
import classes from "./post-form.module.css";

async function sendPostData(postDetails) {
  const resposnse = await fetch("/next-blog/api/posts", {
    method: "POST",
    body: JSON.stringify(postDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resposnse.json();

  if (!resposnse.ok) {
    toast.error(data.message || "Something went wrong");
  }
}

export default function PostForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPostText, setEnteredPostText] = useState("");
  const [status, setStatus] = useState();

  async function sendPostHandler(event) {
    event.preventDefault();
    try {
      setStatus("pending");
      await sendPostData({
        title: enteredTitle,
        postText: enteredPostText,
      });
      setStatus("success");
      toast.success("Request completed successfully.");
      setEnteredTitle("");
      setEnteredPostText("");
    } catch (error) {
      setStatus("error");
      toast.error(error.message || "Failed to complete the request.");
      return;
    }
  }

  return (
    <section className={classes.contact}>
      <h2>Add new Post</h2>
      <form className={classes.form} onSubmit={sendPostHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="text">Title</label>
            <input
              type="text"
              id="text"
              required
              value={enteredTitle}
              onChange={(event) => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="postText">Post Text</label>
          <textarea
            rows="5"
            id="postText"
            value={enteredPostText}
            required
            onChange={(event) => {
              setEnteredPostText(event.target.value);
            }}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Post</button>
        </div>
      </form>
      {status === "pending" && <Loader color="#000000" />}
    </section>
  );
}
