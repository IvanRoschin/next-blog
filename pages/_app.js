import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout/layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, inicial-scale=1"
        ></meta>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
