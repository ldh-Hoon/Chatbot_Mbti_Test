import React from "react";
import ChatApp from "../app/ChatApp.js";
import Head from "next/head";
import styles from "../public/styles/global.css"; // 상대 경로를 사용하여 App.module.css 파일을 import 합니다.


const My_App = () => { 
  return (
    <>
      <Head>
        {/* Leave the font-face import in the global App.css */}
      </Head>
      {/* Apply the CSS module styles to the root div */}
      <div className={styles['app-container']}>
        <ChatApp />
      </div>
    </>
  );
};

export default My_App;
