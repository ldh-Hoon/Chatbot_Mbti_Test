import React, { useState , useEffect } from "react";
import styles from "../public/styles/App.module.css";
import {processOutput, convertLabelToStr, BACKEND_URL, questions, ans_added } from "../public/styles/value_list"

var loading_wait = 0;
var all_log = '';
var tern = 0;
var user_log = '';
var top_pred = 0;

var need_ans_add = 0;
var need_user_log_len = 50 ;
var ending = 0;
var mid_check = 0;
const max_tern = 10;

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const scrollToBottom = () => {
    var el = document.getElementById('message-list'); 
    el.scrollTop = el.scrollHeight;
  }
  useEffect(() => {
    scrollToBottom(); // 컴포넌트가 렌더링될 때 스크롤을 아래로 이동
  }, [messages]);

  useEffect(() => {//처음 한 번만 실행
    var initialBotMessage = {
      text:
        "내가 너의 mbti를 맞춰볼게! 나랑 조금만 이야기하면 돼! 보다 정확한 결과를 위해 단답은 피해줘~",
      isUser: false,
    };
    setMessages([initialBotMessage]);
    var t = questions[Math.floor(Math.random() * questions.length)]
    initialBotMessage = {
      text: t, 
      isUser: false,
    };
    setMessages((prevMessages) => [...prevMessages, initialBotMessage]);
    all_log += "\nyou: " + t;
  }, []);


  const handleSendMessage = async () => {    
    // id of the chat container ---------- ^^^
    if (inputMessage.trim() !== "") {
      if(loading_wait==0){
        if(tern<max_tern){
          loading_wait = 1;
          const newMessage = { text: inputMessage, isUser: true };
          setMessages((prevMessages) => [...prevMessages, newMessage]); 
          user_log += inputMessage + ", ";
          //내용만 보여지게 표시
          setInputMessage(""); // 메시지 전송 후 입력창 초기화
          var user_message = "\nfriend: "+inputMessage+" \nyou: " //실제 챗봇에게 보내는 문자열 형식 
          if(need_ans_add==1){
            user_message += ans_added[Math.floor(Math.random() * ans_added.length)]
            need_ans_add = 0;
          }
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
          if(Math.random()>0.7){
            var t = questions[Math.floor(Math.random() * questions.length)]
            var initialBotMessage = {
              text: t, 
              isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, initialBotMessage]); 
            all_log = "\nyou: " + t;
            need_ans_add = 1;
          }
          
        }
        else if(tern == max_tern)
        {
          try {
            loading_wait = 1;
            const newMessage = { text: inputMessage, isUser: true };
            setMessages((prevMessages) => [...prevMessages, newMessage]); 
            user_log += inputMessage + ", ";
            //내용만 보여지게 표시
            setInputMessage(""); // 메시지 전송 후 입력창 초기화

            const user_message = "\nfriend: "+inputMessage+" \nyou: "//실제 챗봇에게 보내는 문자열 형식 
            all_log += user_message;//대화기록에 추가 
            try 
            { 
              const response = await fetch(`${BACKEND_URL}api/get_chatbot_response/`, {
                method: "POST",
                headers: { "Content-Type": "application/json", 
                },
                body: JSON.stringify({ message: all_log }),
              }
              );

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              const data = await response.json();
              const bot_ans = processOutput(data, all_log.length);
              all_log += bot_ans;
              // 챗봇의 응답 메시지를 메시지 목록에 추가
              const botResponseMessage = { text: bot_ans, isUser: false };
              setMessages((prevMessages) => [...prevMessages, botResponseMessage]); 
            } catch (error) 
            {
              console.error("Error sending message:", error);
            }

            const response = await fetch(`${BACKEND_URL}api/get_mbti/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: user_log }),
            });

            const data = await response.json();
            const bot_ans = convertLabelToStr(data['message'][0]['label']);
            // 챗봇의 응답 메시지를 메시지 목록에 추가 , convertLabelToStr
            var botResponseMessage = { text: "너의 mbti는 " + bot_ans + "구나!", isUser: false };
            setMessages((prevMessages) => [...prevMessages, botResponseMessage]); 
            
            const t = "<<ai예측 확률>>\n" + convertLabelToStr(data['message'][0]['label']) + " : " 
              + Math.round(data['message'][0]['score']*1000)/10 + "%, " 
              + convertLabelToStr(data['message'][1]['label']) + " : "
              + Math.round(data['message'][1]['score']*1000)/10 + "%, " 
              + convertLabelToStr(data['message'][2]['label']) + " : "
              + Math.round(data['message'][2]['score']*1000)/10 + "%, " ;
            var botResponseMessage2 = { text: t, isUser: false };
            setMessages((prevMessages) => [...prevMessages, botResponseMessage2]); 

          
            loading_wait = 0;
          } 
          catch (error) 
          {
            console.error("Error sending message:", error);
            loading_wait = 0;
          }
        }
        else
        {
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
        <h1 max-width = "100px" align = "center">챗봇과 대화</h1>
        <h4 align = "center" >(현재 {max_tern+1}턴까지 대화 후 mbti반환)</h4>
        <div className={styles["message-list"]} id="message-list" name="message-list">
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