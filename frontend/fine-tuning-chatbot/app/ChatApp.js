import React, { useState , useEffect } from "react";
import styles from "../public/styles/App2.module.css";
import {convertLabelToStr, BACKEND_URL, questions, ans_added } from "../public/styles/value_list"
import Image from 'next/image';
import { CiChat1 } from "react-icons/ci";
import { SiProbot } from "react-icons/si";

var loading_wait = 0;
var all_log = '';
var tern = 0;
var user_log = '';
var top_pred = 0;

var need_ans_add = 0;
var need_user_log_len = 50 ;
var ending = 0;
var mid_check = 0;
const max_tern = 5;

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const scrollToBottom = () => {
    var el = document.getElementById('message-list'); 
    el.scrollTop = el.scrollHeight;
  }
  const loading_on = () => {
    var s = document.getElementById('spin');
    s.style.visibility  = "visible";
  }
  const loading_off = () => {
    var s = document.getElementById('spin');
    s.style.visibility  = "hidden";
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
    var t = questions[Math.floor(Math.random() * questions.length)];
    initialBotMessage = {
      text: "첫 번째 질문! " + t, 
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
          var user_message = "\nfriend: "+inputMessage+" \n\n### \nyou: " //실제 챗봇에게 보내는 문자열 형식 
          if(need_ans_add==1){
            user_message += ans_added[Math.floor(Math.random() * ans_added.length)]
            need_ans_add = 0;
          }
          all_log += user_message;//대화기록에 추가 
          try { 
            loading_on();
            const response = await fetch(`${BACKEND_URL}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data : [all_log] })
            });
            
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            var data = await response.json();
            const bot_ans = data.data.toString();
            all_log += bot_ans;
            // 챗봇의 응답 메시지를 메시지 목록에 추가
            const botResponseMessage = { text: bot_ans, isUser: false };
            setMessages((prevMessages) => [...prevMessages, botResponseMessage]); 
            loading_wait = 0;
            if(Math.random()>0.5)
            {
              if(bot_ans.substr(-1)!='?' || bot_ans.substr(-1)!='?!')
              {
                var t = questions[Math.floor(Math.random() * questions.length)];
                var initialBotMessage = {
                  text: "다음 질문! " + t, 
                  isUser: false,
                };
                setMessages((prevMessages) => [...prevMessages, initialBotMessage]); 
                all_log = "\nyou: " + t;
                need_ans_add = 1;
              }
            }
          } catch (error) {
            console.error("Error sending message:", error);
            loading_wait = 0;
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
            
            const user_message = "\nfriend: "+inputMessage+" \n\n### \nyou: "//실제 챗봇에게 보내는 문자열 형식 
            all_log += user_message;//대화기록에 추가 
            try 
            { 
              loading_on();
              const response = await fetch(`${BACKEND_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", 
                },
                body: JSON.stringify({ data: [all_log] }),
              }
              );

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              var data = await response.json();
              const bot_ans = data.data.toString();
              all_log += bot_ans;
              // 챗봇의 응답 메시지를 메시지 목록에 추가
              const botResponseMessage = { text: bot_ans, isUser: false };
              setMessages((prevMessages) => [...prevMessages, botResponseMessage]); 
            } catch (error) 
            {
              console.error("Error sending message:", error);
            }

            const response = await fetch(`${BACKEND_URL}_1`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data : [user_log] }),
            });

            var data = await response.json();
            data = data.data;
            data = eval('(' + data + ')');
            const bot_ans = convertLabelToStr(data[0]['label']);
            // 챗봇의 응답 메시지를 메시지 목록에 추가 , convertLabelToStr
            var botResponseMessage = { text: "너의 mbti는 " + bot_ans + "구나!", isUser: false };
            setMessages((prevMessages) => [...prevMessages, botResponseMessage]); 
            
            const t = "<<ai예측 확률>>\n" + convertLabelToStr(data[0].label) + " : " 
              + Math.round(data[0]['score']*1000)/10 + "%, " 
              + convertLabelToStr(data[1]['label']) + " : "
              + Math.round(data[1]['score']*1000)/10 + "%, " 
              + convertLabelToStr(data[2]['label']) + " : "
              + Math.round(data[2]['score']*1000)/10 + "%, " ;
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
      loading_off();
      }
    }
  };

  return (
    <div className={styles["app-container"]}>
      <div>
        <h3><span className={styles["notbold"]}><CiChat1/> mbti 테스트<hr/></span></h3>
      <div>
      <div className={styles["chat-app"]}>
        <div className={styles["chat-box"]}>
          <div className={styles["message-list"]} id="message-list" name="message-list">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>

          <div className={styles["spin"]} id="spin" name="spin"><img src="spin.gif" alt="loading"/></div>
          <div className={styles["user-input-box"]}>
          <input
              type="text"
              value={inputMessage}
              maxLength={30}
              
              onChange={(e) => setInputMessage(e.target.value)}
              className={styles["input-font"]} // 커스텀 폰트 적용
            />
            <button onClick={handleSendMessage} className={styles["button-font"]}>Send</button> {/* 커스텀 폰트 적용 */}
          </div>
        </div>
      </div>
    </div>

    </div></div>
  );
};



const Message = ({ message }) => {
  const messageClass = message.isUser ? styles["user-message"] : styles["bot-message"]; // Use styles object for dynamic class names

  if(message.isUser){
    return (
      <div className={messageClass}>
        <p>{message.text}</p>
      </div>
    );
  }
  return (
    <div className={messageClass}>
      <p>&nbsp;&nbsp;<SiProbot/><br/>{message.text}</p>
    </div>
  );
};

export default ChatApp;