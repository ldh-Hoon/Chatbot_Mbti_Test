//const BACKEND_URL = "http://127.0.0.1:8000/";

const BACKEND_URL = "https://ldhldh-chat-and-bert-rest-api-with-gradio.hf.space/run/predict"; // huggingface space

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


function processOutput(output, n) {
    output = output.toString();
    output = output.substring(n);
    output = output.split("\n")[0];
    output = output.split("<endoftext>")[0];
    output = output.split("end")[0];
    output = output.replace(/[=+#/\\\:@%&*$"|\(\)\[\]\<\>`'…》·]/g, "");
    return output;
}
function convertLabelToStr(label){
  const mbtiMap = {
      "LABEL_0": "INTJ", "LABEL_1": "INTP", "LABEL_2": "INFJ", "LABEL_3": "INFP",
      "LABEL_4": "ISTJ", "LABEL_5": "ISTP", "LABEL_6": "ISFJ", "LABEL_7": "ISFP",
      "LABEL_8": "ENTJ", "LABEL_9": "ENTP", "LABEL_10": "ENFJ", "LABEL_11": "ENFP",
      "LABEL_12": "ESTJ", "LABEL_13": "ESTP", "LABEL_14": "ESFJ", "LABEL_15": "ESFP"
  };
  label = label.toString()
  return mbtiMap[label];
}

export {processOutput, convertLabelToStr, BACKEND_URL, questions, ans_added};