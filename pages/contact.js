import Head from "next/head";
import ContactForm from "../components/contact-page/contact-form";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your messages"></meta>
      </Head>
      <ContactForm />
    </>
  );
}
