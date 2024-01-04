import ReactDom from "react-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@components/loader/loader";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const resposnse = await fetch("/next-blog/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resposnse.json();

  if (!resposnse.ok) {
    toast.error(data.message || "Something went wrong");
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [status, setStatus] = useState();

  async function sendMessageHandler(event) {
    event.preventDefault();
    try {
      setStatus("pending");
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setStatus("success");
      toast.success("Request completed successfully.");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      setStatus("error");
      toast.error(error.message || "Failed to complete the request.");
      return;
    }
  }

  return (
    <section className={classes.contact}>
      <h2>How can I help you?</h2>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => {
                setEnteredEmail(event.target.value);
              }}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => {
                setEnteredName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            rows="5"
            id="message"
            value={enteredMessage}
            required
            onChange={(event) => {
              setEnteredMessage(event.target.value);
            }}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {status === "pending" && <Loader color="#000000" />}
    </section>
  );
}
