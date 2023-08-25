# 🤗 Chatbot_Mbti_Test 🤗
<div align="center">
    <img src="https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/fbc96ead-3194-4745-be55-6b6d55524b51" />
</div>

채팅형 mbti 테스트. 인공지능과 대화를 통해 내 mbti를 알아볼 수 있습니다.


해당 팀 프로젝트의 frontend 구현부입니다.

<div align="center">
  <h5>Frameworks/Platforms</h5>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=Netlify&logoColor=white" />
  <img src="https://img.shields.io/badge/Google Colab-F9AB00?style=flat&logo=Google Colab&logoColor=white" />
  <a href = "https://huggingface.co/"><img src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo-with-title.svg" height="25"/></a>
</div>

<div align="center">
  <h5>Languages</h5>
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS3&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white" />
</div>

# 👨‍👨‍👧‍👧 참여자

[임동훈](https://github.com/ldh-Hoon) [이준호](https://github.com/Lanvizu)


# 📆 프로젝트 기간 

2023년 7월 ~ 2023년 8월


>7.1~7.5 아이디어 구체화

>7.5~7.20 인공지능 모델 파인튜닝 및 학습

>7.20~8.1 프론트 페이지 구현

>8.1~8.15 마무리 및 배포

> ~ 정리 및 마무리

# 👀 preview

<details>
    <summary>자세히</summary>

![Animation](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/64159a73-28d6-48ba-a146-2d8a87ba695f)


![Animation3](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/89fc8593-cdf4-49fa-b4fa-7c419228b0ca)

![Animation4](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/f8c50b79-01ce-482a-8dc1-c92963d51897)

</details>



# 🔎 Demo 및 배포
[데모 링크](https://mbtitestchat.netlify.app/)

Netlify로 배포됩니다
[배포용 Github](https://github.com/Lanvizu/mbtiTestProject4)


# 🖌 플로우차트

<details>
    <summary>자세히</summary>

![image](https://github.com/ldh-Hoon/Chatbot_Mbti_Test/assets/139981434/54170d87-21a1-4905-9606-d49d779f0842)
</details>


# 🔧 구현된 기능

>메인페이지, 채팅페이지 이동

>챗봇과 채팅

>MBTI 추론결과 출력

>결과 카카오톡 공유하기


# 🔨 데이터셋 및 모델 

<h5>Language Model</h5>
데이터 : 
https://github.com/Ludobico/KakaoChatData 를 다시 정제하여 LoRA로 Colab에서 학습했습니다.

모델 : <a href="https://huggingface.co/EleutherAI/polyglot-ko-1.3b">EleutherAI/polyglot-ko-1.3b</a>

학습 코드  <a href="https://colab.research.google.com/drive/1u3anPYeuJcsdFRaRMByMB4hGbkWAEiR1?usp=sharing"><img src="https://img.shields.io/badge/open in Colab-F9AB00?style=flat&logo=Google Colab&logoColor=white" /></a>

<h5>MBTI분류 Model</h5>
데이터 :
https://www.kaggle.com/datasets/zeyadkhalid/mbti-personality-types-500-dataset 를 정제하여 Colab에서 학습했습니다.

모델 : https://huggingface.co/bert-base-cased

학습 코드  <a href="https://colab.research.google.com/drive/1YurLnkVP5cMnbHwM1j9tN8yGQGfbiqAO?authuser=1"><img src="https://img.shields.io/badge/open in Colab-F9AB00?style=flat&logo=Google Colab&logoColor=white" /></a>



# ⚡ 사용된 폰트 및 이미지

<a href="https://noonnu.cc/font_page/1136">폰트 : <img src="https://noonnucc-production.sfo2.cdn.digitaloceanspaces.com/202304/1680424033641026.png" height="25"/></a> 

react-icons SiProbot https://react-icons.github.io/react-icons/search?q=SiProbot



# 💻 api서버
<img src="https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/90aab449-2e92-4854-8a6a-b6d21bb09f91" height="20" />
모델 추론은 🤗Huggingface Space를 이용합니다. 
<a href="https://huggingface.co/spaces/ldhldh/chat_and_bert_rest-api-with-gradio "><img src="https://img.shields.io/badge/open in Huggingface-444444?style=flat&logo=Huggingface&logoColor=white" /></a>



# 📌 마주했던 이슈들


<details>

<summary>데이터 전처리</summary>

##### MBTI분류를 위한 데이터를 영문 단어 데이터셋밖에 구하지 못했다.

또한 임의의 단어를 샘플링해둔 데이터였기 때문에, 적절한 길이로 자르고, 너무 많은 데이터를 정리하고,

MBTI별로 골고루 분포하도록 전처리하여 학습시켰더니 정확도가 좋아졌다. 

>또한, 영어 데이터셋이기 때문에 영/한 번역 과정을 통해 영어 BERT모델의 입력으로 넣도록 구현했다.



</details>


.


<details>
    
<summary>언어모델 학습 이슈</summary>

##### QLoRA로 학습하는 중에 특정 가중치가 비정상적으로 오차가 생겨 loss가 무한대 혹은 0으로 내려가는 이슈가 있었다.

>페이지 최적화를 사용하지 않으니 문제가 해결되었다.

1.3b 모델은 LoRA로 학습했다.


    
</details>


.


<details>
    
<summary>긍부정 답변 분류모델 학습 이슈</summary>

##### 응/아니, 좋아/싫어, 그래/안해 등 답변의 긍정, 부정을 판단하는 모델을 구현하고자 했다. 
    
그러나 데이터셋이 없었다. 

>수작업으로 200개 이내의 라벨링된 답변 데이터셋을 만들어 KoBERT모델을 초소량만 학습시켰더니 괜찮은 성능을 얻었다.



</details>


.


<details>
    
<summary>언어모델 서빙 이슈(리소스의 한계)</summary>

##### 기존에는 오픈소스인 gpt neox중 polyglot-ko 12.8b 혹은 5.8b 정도의 모델을 사용하고자 했다.

Colab에서 QLoRA로 학습하여 긴 문맥 인식과 좋은 답변을 얻을 수 있었지만, 추론 속도의 문제와 서버 자원의 문제가 있었다.

더 가볍고 빠른 모델이 필요하다고 판단하여 1.3b모델로 수정하였고, 2cpu인 Huggingface free space를 통해 서빙할 수 있었다.

>감사합니다 Huggingface!


    
</details>


.


<details>
    
<summary>언어모델 답변의 개선</summary>

##### 1.3b모델의 답변이 너무 아쉬웠다.

특히 대화가 길어질수록 문맥의 이용과 자연스럽고 능동적인 질문이 거의 불가능했다.

>학습 데이터셋의 instruction 형태와 대화 형태를 조정하니 훨씬 좋은 답변을 얻을 수 있었다. 

또한, polyglot-ko모델 에서 <|endoftext|> , 개행, eos/pad 등의 토큰 학습이 잘 안되는 이슈가 있는 듯 했다.

학습은 하는데 출력에 능동적으로 사용하지 못하고 문장이 애매하게 끝나는 경우가 많았다.

따라서 잘 안쓰이는 임의의 글자로 문장 끝을 학습시킨 후, 잘라서 답변으로 사용하니 출력이 좋아졌다.


    
</details>


.


<details>

<summary>백엔드, 프론트엔드 구조 이슈</summary>

##### 초기에 Django Rest framework를 사용해 백엔드를 개발하고자 했다.

프론트와 백엔드의 연동을 모두 구현하였지만, 실질적으로 Frontend<->Backend<->Huggingface Space 사이의 연동 구조에서 

>Django Backend의 필요성이 없다고 판단하여 불필요한 서버 사용을 줄이기 위해 제외하였다.

    
</details>


.


<details>
    
<summary>대화 로직</summary>

##### 부족한 문맥 이해 성능을 가진 언어모델로 인해 자연스러운 챗봇과의 대화 진행을 위한 개선이 필요했다. 

따라서 적절한 질문은 미리 만들어 둔 질문 목록에서 제시하도록 수정하고, 해당 질문들을 시작으로 대화가 이루어질 수 있도록 구현했다.

또한, 일정 확률로 대화 주제가 초기화되도록 하여 모델의 부족한 기억력을 조금이나마 보완하고자 했다. 
    
</details>


.


<details>
    
<summary>배포 이슈</summary>

##### Netlify를 통한 배포에서 여러 에러가 있었다.

단순히 폴더 경로설정 문제부터, 주기적인 업데이트 문제까지 다양한 고민거리가 생겼다. 

이 과정에서 배포를 위한 정적 페이지 리소스 준비와, 실제 배포의 공부와 경험을 할 수 있었다.
    
</details>

.




# 🗒 경험한 것

#### TransFormers Model

>배경지식 학습과 공부
   
>KakaoChat 데이터 정리 및 Colab을 통한 대화모델 학습

>LoRA, QLoRA 학습과 구현
        
>MBTI 데이터셋 전처리와 BERT 모델 Colab 학습 
    
>긍정/부정 답변 BERT 모델 초소량 학습
        
>데이터셋 크기, 학습 파라메터 조절을 통한 학습 최적화 경험
       
>모델 서빙 성능 및 속도 최적화


    
#### Backend
    
>Django Rest framework 개발(미사용) → 허깅페이스 space 이용(현재)


        
#### Frontend
    
>react 프론트 개발
        
>next.js를 이용하여 대화창, 대화 스타일 디자인, js 및 CSS
        
>기본 대화 틀, 질문과 턴 등 적절한 챗봇 대화 로직 구현
    
>프론트와 백엔드의 api 연동(Axios,fech 등) 
    
>카카오톡 공유하기 기능 구현

>배포하는 방법들 - github, netlify를 이용한 서버 배포
    
    

# 🚀 개선할 점


#### mbti 모델의 정확도

mbti 단어 데이터셋이 영어였기 때문에 한/영 번역 후 영어 BERT모델을 통해 추론한다.

>한국어 데이터셋을 통해 학습한다면 더 좋은 정확도를 낼 수 있을 것이다.

데이터셋이 각 mbti의 블로그나 작성한 글을 토대로 수집했기 때문에 명확하게 특정 단어가 특정 mbti를 나타낸다고 보긴 어려운 점이 있다.
    
#### 언어모델
    
대화가 비교적 매끄럽지만, 아쉬운 답변이 많이 생성된다.
        
그로 인해 질문을 자주 갱신하고, 최대한 짧은 답변만을 받아볼 수 있다.

>데이터셋의 개선, 더 큰 언어모델의 사용 등 개선할 부분이 많이 남아있다.

다만 서빙 서버의 비용을 감안했을 때, 이번 프로젝트에서는 가볍고 빠르지만 아쉬운 모델의 사용이 더 적합하다고 생각했다.

#### 디자인

>더 매력적인 디자인과 스토리 배경 등을 추가한다면 좋을 것이다.
