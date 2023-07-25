import React, { useState } from "react";
import styles from "../public/styles/App.module.css";
import "./const_list"
const BACKEND_URL = "http://127.0.0.1:8000/";

var loading_wait = 0;
var all_log = '';
var tern = 0;
var user_log = '';
var top_pred = 0

var need_user_log_len = 50 
var ending = 0
var mid_check = 0
function processOutput(output, n) {
    output = output.substring(n - 1);
    output = output.split("\n")[0];
    output = output.replace(/[=+#/\:@*"|\(\)\[\]`'…》·]/g, "");
    output = output.replace(/[a-zA-Z]/g, "");
    return output;
}
function convertLabelToStr(label){
  const mbtiMap = {
      "LABEL_0": "INTJ", "LABEL_1": "INTP", "LABEL_2": "INFJ", "LABEL_3": "INFP",
      "LABEL_4": "ISTJ", "LABEL_5": "ISTP", "LABEL_6": "ISFJ", "LABEL_7": "ISFP",
      "LABEL_8": "ENTJ", "LABEL_9": "ENTP", "LABEL_10": "ENFJ", "LABEL_11": "ENFP",
      "LABEL_12": "ESTJ", "LABEL_13": "ESTP", "LABEL_14": "ESFJ", "LABEL_15": "ESFP"
  };
  return mbtiMap[label];
}
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      if(loading_wait==0){
      if(tern<5){
        loading_wait = 1;
      const newMessage = { text: inputMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      user_log += inputMessage + ", ";
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
        loading_wait = 0;
      } catch (error) {
        console.error("Error sending message:", error);
        loading_wait = 0;
      }
    }else if(tern == 5){
      try {
        loading_wait = 1;
        const newMessage = { text: inputMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      user_log += inputMessage + ", ";
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
        loading_wait = 0;
      } catch (error) {
        console.error("Error sending message:", error);
        loading_wait = 0;
      }

        const response = await fetch(`${BACKEND_URL}api/get_mbti/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: user_log }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const bot_ans = convertLabelToStr(data['message']['label']);
        // 챗봇의 응답 메시지를 메시지 목록에 추가 , convertLabelToStr
        const botResponseMessage = { text: "너의 mbti는 " + bot_ans + "구나!", isUser: false };
        setMessages((prevMessages) => [...prevMessages, botResponseMessage]);
        loading_wait = 0;
      } catch (error) {
        console.error("Error sending message:", error);
        loading_wait = 0;
      }
  }else{
        const bot_ans = "...새로고침해주세요...";
        // 챗봇의 응답 메시지를 메시지 목록에 추가 , convertLabelToStr
        const botResponseMessage = { text: bot_ans, isUser: false };
        setMessages((prevMessages) => [...prevMessages, botResponseMessage]);
        loading_wait = 0;
  }
  tern += 1;
  }
}
  };

  return (
    <div className={styles["chat-app"]}>
      <div className={styles["chat-box"]}>
        <h1>챗봇과 대화</h1>
        (현재 5턴까지 대화 후 mbti반환)
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