import React, { useState , useEffect} from "react";
import styles from "../public/styles/App.module.css";
const BACKEND_URL = "http://127.0.0.1:8000/";


//질문 목록
const questions =['너는 취미가 뭐니?',
'주말엔 주로 뭐를 해?',
'가장 좋아하는 음식이 뭐야?',
'자주 듣는 노래 장르가 뭐야?',
'친구는 많은 편이니?',
'내일은 뭐 할거야?',
'혹시 지금 솔로야?',
'요즘 듣는 노래가 있을까?',
'요즘 드라마는 뭐 봐?',
'가장 최근에 본 영화는 어떤 내용이야?',
'요즘 고민같은거 있어?',
'나한테 물어보고 싶은거 있어?',
'만약 여행을 간다면 어디로 가고싶어?',
'오늘 하루는 어땠어?',
'너는 꿈이 뭐야?',
'가장 좋아하는 색이 뭐야?',
'봄, 여름, 가을, 겨울중에 어떤 계절이 제일 좋아?',
'이제 물어볼 주제도 없따..'
];
const ans_added = ['아하','헐','아','아 진짜', '음', '그래?', '엥', '오', '와', '우와',
'와 정말', '오 정말', '아 정말', '와 진짜', '헐 진짜', '키키', '대박', '그렇구나'];
const ans_added2 = ['아하','와!', '응!', '그래!', '키키'];
const ans_added3 = ['ㅠㅠ ','에이...', '으응...', '어? ', '힝', '아...', '으악...', 
'헐', '헉']
const ans_re = [' 그러지 말구 한번만 해보자, 응?',
          '왜애 한번만 해봐~',
          '...아니지? 해줄거지?'];
const ans_middle = ['음...슬슬 조금만 더 들으면 알 수 있겠는데...?',
              '오호...윤곽이 보인다!',
              '너의 mbti는 파악되고있다...'];

const max_tern = 3;


var loading_wait = 0;
var all_log = '';
var tern = 0;
var user_log = '';
var top_pred = 0;

var need_ans_add = 0;
var need_user_log_len = 50 ;
var ending = 0;
var mid_check = 0;
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