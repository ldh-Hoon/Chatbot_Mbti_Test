import React, { useState } from "react";
import styles from "../public/styles/App.module.css";

const BACKEND_URL = "http://127.0.0.1:8000/";
var all_log = '';

function processOutput(output, n) {
    output = output.substring(n - 1);
    output = output.split("\n")[0];
    output = output.replace(/[=+#/\:@*"|\(\)\[\]`'…》·]/g, "");
    output = output.replace(/[a-zA-Z]/g, "");
    return output;
}

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newMessage = { text: inputMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      //내용만 보여지게 표시
      setInputMessage(""); // 메시지 전송 후 입력창 초기화

      const user_message = "\nfriend: "+inputMessage+" \nyou: "//실제 챗봇에게 보내는 문자열 형식 
      all_log += user_message;//대화기록에 추가 
      try {
        const response = await fetch(`${BACKEND_URL}api/get_chatbot_response/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: all_log }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const bot_ans = processOutput(data, all_log.length);
        all_log += bot_ans;
        // 챗봇의 응답 메시지를 메시지 목록에 추가
        const botResponseMessage = { text: bot_ans, isUser: false };
        setMessages((prevMessages) => [...prevMessages, botResponseMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className={styles["chat-app"]}>
      <div className={styles["chat-box"]}>
        <h1>챗봇과 대화</h1>
        <div className={styles["message-list"]}>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
        <div className={styles["user-input-box"]}>
        <button onClick={handleSendMessage} className={styles["button-font"]}>Send</button> {/* 커스텀 폰트 적용 */}
        <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={styles["input-font"]} // 커스텀 폰트 적용
          />
        </div>
      </div>
    </div>
  );
};



const Message = ({ message }) => {
  const messageClass = message.isUser ? styles["user-message"] : styles["bot-message"]; // Use styles object for dynamic class names

  return (
    <div className={messageClass}>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatApp;