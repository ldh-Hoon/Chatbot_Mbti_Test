import React, { useState, useEffect } from "react";
import styles from "../public/styles/App2.module.css";
import { convertLabelToStr, BACKEND_URL, questions, ans_added, intro_add, ans_re_1, ans_re_2, ans_re_3, ans_middle } from "../public/styles/value_list"
import Image from 'next/image';
import { CiChat1 } from "react-icons/ci";
import { SiProbot } from "react-icons/si";
import Router from "next/router";
import Typewriter from 'typewriter-effect';


var loading_wait = 0;
var all_log = '';
var tern = 0;
var user_log = '';
var top_pred = 0;

var need_ans_add = 0;
var need_user_log_len = 80;
var ending = 0;
var mid_check = 0;
const max_tern = 20;

var intro = 1;
var questionslist = questions;

var share_text = "초기값 text" + "\n" + "줄바꿈";

//kakao func
export const shareKakao = (route, title, text) => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init("2d6c8a35f8af41c05aef0c790a1f1681"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }//process.env.REACT_APP_SHARE_KAKAO_LINK_KEY

    kakao.Link.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: title, // 인자값으로 받은 title
        description: text, // 인자값으로 받은 title
        imageUrl: "https://user-images.githubusercontent.com/139981434/257801881-fbc96ead-3194-4745-be55-6b6d55524b51.png",
        link: {
          mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
          webUrl: route
        }
      },
      buttons: [
        {
          title: "대화하러 가기",
          link: {
            mobileWebUrl: route,
            webUrl: route
          }
        }
      ]
    });
  }
};



const scrollToBottom = () => {
  var el = document.getElementById('message-list');
  el.scrollTop = el.scrollHeight;
}

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  
  useEffect(() => {
    const start = () => {
      // NProgress.start();
      setLoading(true);
    };
    const end = () => {
      // NProgress.done();
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []); // 로딩 

  const sleep = (ms) => {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) { }
  }

  const loading_on = () => {
    var s = document.getElementById('spin');
    s.style.visibility = "visible";
  }
  const loading_off = () => {
    var s = document.getElementById('spin');
    s.style.visibility = "hidden";
  }

  useEffect(() => {
    window.addEventListener("resize", function () { //크기 조절시마다 아래로 스크롤
      scrollToBottom();
    })
    scrollToBottom(); // 컴포넌트가 렌더링될 때 스크롤을 아래로 이동
  }, [messages]);

  useEffect(() => {//처음 한 번만 실행
    var initialBotMessage = {
      text:
        "안녕, 친구야!🤗 혹시 내가 너의 mbti를 맞춰봐도 될까?",
      isUser: false,
    };
    setMessages([initialBotMessage]);

    scrollToBottom();
  }, [ ]);

  
  const handleSendMessage = async () => {
    // id of the chat container ---------- ^^^
    if (inputMessage.trim() !== "") {
      if (loading_wait == 0) {
        if (tern <= 0) {
          loading_wait = 1;
          const newMessage = { text: inputMessage, isUser: true };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setInputMessage("");
          //일단 내용 보여지게
          loading_on();

          const response = await fetch(`${BACKEND_URL}_2`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: [inputMessage] })
          });

          var data = await response.json();
          const yn = parseInt(data.data.toString());
          sleep(500);
          if (yn == 0) {
            var bot_ans = ans_re_1[Math.floor(Math.random() * ans_re_1.length)]
              + " " + ans_re_2[Math.floor(Math.random() * ans_re_2.length)]
              + " " + ans_re_3[Math.floor(Math.random() * ans_re_3.length)];
            // 챗봇의 응답 메시지를 메시지 목록에 추가
            var botResponseMessage = { text: bot_ans, isUser: false };
            setMessages((prevMessages) => [...prevMessages, botResponseMessage]);
            tern -= 1;
          }
          else {
            var qindex = Math.floor(Math.random() * questionslist.length);
            var t = questionslist[qindex];
            questionslist.splice(qindex, 1); // 이미 한 질문은 제외 
            var initialBotMessage2 = {
              text: "좋아! 테스트를 위해 나랑 조금만 이야기하면 돼! " + "\n"
                + "보다 정확한 결과를 위해 단답은 피해줘~  " + "\n "
                + intro_add[Math.floor(Math.random() * intro_add.length)] + " 첫 번째 질문! " + t,
              isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, initialBotMessage2]);
            all_log += "\nyou: " + t;
            need_ans_add = 1;
          }
        }
        else if (tern < max_tern) {
          loading_wait = 1;
          if (user_log.length >= need_user_log_len) {
            tern = max_tern - 1;
          }
          const newMessage = { text: inputMessage, isUser: true };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          user_log += inputMessage + " \n";
          //내용만 보여지게 표시
          setInputMessage(""); // 메시지 전송 후 입력창 초기화
          var user_message = "\nfriend: " + inputMessage + " \n\n### \nyou: " //실제 챗봇에게 보내는 문자열 형식 
          if (need_ans_add == 1) {
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
              body: JSON.stringify({ data: [all_log] })
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            var data = await response.json();
            var bot_ans = data.data.toString();
            all_log += bot_ans;
            // 챗봇의 응답 메시지를 메시지 목록에 추가
            var botResponseMessage = { text: bot_ans, isUser: false };
            if (Math.random() > 0.4) {
              if (bot_ans.indexOf('?') == -1) { // bot 답변에 ?가 없을 때
                if (user_log.length >= need_user_log_len / 2) {
                  if (mid_check == 0) {
                    bot_ans += "\n" + ans_middle[Math.floor(Math.random() * ans_middle.length)];
                    mid_check = 1;
                  }
                }
                var qindex = Math.floor(Math.random() * questionslist.length);
                var t = questionslist[qindex];
                questionslist.splice(qindex, 1);
                botResponseMessage = {
                  text: bot_ans + "\n" + " 다음 질문! " + t,
                  isUser: false,
                };
                all_log = "\nyou: " + t;
                need_ans_add = 1;
              }
            }
            setMessages((prevMessages) => [...prevMessages, botResponseMessage]);
          } catch (error) {
            console.error("Error sending message:", error);
          }
        }
        else if (tern == max_tern) {
          if (user_log.length >= need_user_log_len) {
            try {
              loading_wait = 1;
              const newMessage = { text: inputMessage, isUser: true };
              setMessages((prevMessages) => [...prevMessages, newMessage]);
              user_log += inputMessage + " \n";
              //내용만 보여지게 표시
              setInputMessage(""); // 메시지 전송 후 입력창 초기화

              var user_message = "\nfriend: " + inputMessage + " \n\n### \nyou: "//실제 챗봇에게 보내는 문자열 형식 
              if (need_ans_add == 1) {
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
              } catch (error) {
                console.error("Error sending message:", error);
              }

              const response = await fetch(`${BACKEND_URL}_1`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: [user_log] }),
              });

              var data = await response.json();
              data = data.data;
              data = eval('(' + data + ')');
              const bot_ans = convertLabelToStr(data[0]['label']);
              // 챗봇의 응답 메시지를 메시지 목록에 추가 , convertLabelToStr

              const t = "너의 mbti는 " + bot_ans + "구나! " + "\n"
                + convertLabelToStr(data[0].label) + " : "
                + Math.round(data[0]['score'] * 1000) / 10 + "%, " + "\n"
                + convertLabelToStr(data[1]['label']) + " : "
                + Math.round(data[1]['score'] * 1000) / 10 + "%, " + "\n"
                + convertLabelToStr(data[2]['label']) + " : "
                + Math.round(data[2]['score'] * 1000) / 10 + "%, ";
              var botResponseMessage2 = { text: t, isUser: false };
              setMessages((prevMessages) => [...prevMessages, botResponseMessage2]);

              share_text = convertLabelToStr(data[0].label) + " : "
                  + Math.round(data[0]['score'] * 1000) / 10 + "%, " + "\n"
                  + convertLabelToStr(data[1].label) + " : "
                  + Math.round(data[1]['score'] * 1000) / 10 + "%, " + ", "
                  + convertLabelToStr(data[2]['label']) + " : "
                  + Math.round(data[2]['score'] * 1000) / 10 + "%, ";
              var botResponseMessage3 = { text: "_kakao공유하기", isUser: false }; // kakao 공유하기 말풍선
              setMessages((prevMessages) => [...prevMessages, botResponseMessage3]);
            }
            catch (error) {
              console.error("Error sending message:", error);
            }
          }
          else {
            var initialBotMessage = {
              text:
                "미안" + ans_re_3[Math.floor(Math.random() * ans_re_3.length)] + "...모르겠어!" + "\n" + "\n"
                + "(분석을 위한 글자 수를 채우지 못했습니다. 조금 더 성실히 대답해주세요)",
              isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, initialBotMessage]);
          }
        }
        else {
          const bot_ans = "...새로고침해주세요...";
          // 챗봇의 응답 메시지를 메시지 목록에 추가 , convertLabelToStr
          const botResponseMessage = { text: bot_ans, isUser: false };
          setMessages((prevMessages) => [...prevMessages, botResponseMessage]);
        }
        tern += 1;
        loading_off();
        loading_wait = 0;
      }
    }
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  
  return loading ? (
    <div className={styles["spin"]} id="spin" name="spin"><img src="spin.gif" alt="loading" /></div> // loading 
  ) : (
    <div className={styles["app-container"]}>
      <div>
        <h3><span className={styles["notbold"]}><CiChat1 /> mbti 테스트<hr /></span></h3>
        <div>
          <div className={styles["chat-app"]}>
            <div className={styles["chat-box"]}>
              <div className={styles["message-list"]} id="message-list" name="message-list">
                {messages.map((message, index) => (
                  <Message key={index} message={message} />
                ))}
              </div>

              <div className={styles["spin"]} id="spin" name="spin"><img src="spin.gif" alt="loading" /></div>
              <div className={styles["user-input-box"]}>
                <input
                  type="text"
                  value={inputMessage}
                  maxLength={30}
                  onKeyUp={handleOnKeyPress}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className={styles["input-font"]} // 커스텀 폰트 적용
                />
                <button onClick={handleSendMessage} className={styles["button-font"]}>Send</button> {/* 커스텀 폰트 적용 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const Message = ({ message }) => {
  const messageClass = message.isUser ? styles["user-message"] : styles["bot-message"]; // Use styles object for dynamic class names

  if (message.isUser) {
    return (
      <div className={messageClass}>
        <p>{message.text}</p>
      </div>
    );
  }
  else {
    const r = window.location;
    if (message.text == "_kakao공유하기") {//공유하기 
      return (
        <div className={messageClass}>
          <button className={styles["kakaoButton"]}
            id="kakao-link-btn"
            type="button"
            onClick={() => shareKakao(r.toString(), "내 mbti는?! #채팅형_mbti_테스트", share_text)}
          >kakao로 결과 공유하기
            <img src="https://seeklogo.com/images/K/kakaotalk-logo-274D191B7B-seeklogo.com.png" height="30"/>
            </button>
        </div>
      );
    }
    else {
      return (
        <div className={messageClass}>
          <p>❚  <SiProbot /><br />
            <Typewriter
              options={{
                loop: false,
                delay: 45,
              }}

              onInit={(typewriter) => {
                typewriter.typeString(message.text)
                  .callFunction(() => {
                    scrollToBottom();
                  })
                  .start();
              }}
            />
          </p>
        </div>
      );
    }
  }
};

export default ChatApp;