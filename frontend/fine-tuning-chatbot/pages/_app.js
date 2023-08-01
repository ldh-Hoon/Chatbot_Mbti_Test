import React from "react";
import ChatApp from "./ChatApp.js";
import Head from "next/head";
import "../public/styles/global.css"; // 상대 경로를 사용하여 App.module.css 파일을 import 합니다.


const My_App = () => {
  return (
    <>
      <Head>
        {/* Leave the font-face import in the global App.css */}
        <link rel="stylesheet" href="../public/styles/global.css" />
      </Head>
      {/* Apply the CSS module styles to the root div */}
      <div>
        <ChatApp />
      </div>
    </>
  );
};

export default My_App;
