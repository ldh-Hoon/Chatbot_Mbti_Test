import React from "react";
import ChatApp from "./index.js";
import Head from "next/head";
import './public/styles/App.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
         <link rel="stylesheet" href="/styles/App.css" />
      </Head>
      <ChatApp />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;