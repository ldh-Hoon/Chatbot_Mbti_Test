import React from "react";
import ChatApp from "./pages/index.js";
import Head from "next/head";
import styles from "./public/styles/App.module.css"; // 상대 경로를 사용하여 App.module.css 파일을 import 합니다.

 
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        {/* Leave the font-face import in the global App.css */}
        <link rel="stylesheet" href="/styles/App.module.css" />
      </Head>
      {/* Apply the CSS module styles to the root div */}
      <div className={styles["app-container"]}>
        <ChatApp />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
