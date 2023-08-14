# Chatbot_Mbti_Test🤗
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

# 참여자
[임동훈](https://github.com/ldh-Hoon) [이준호](https://github.com/Lanvizu)

# 프로젝트 기간 
2023년 7월 ~ 2023년 8월

7.1~7.5 아이디어 구체화

7.5~7.20 인공지능 모델 파인튜닝 및 학습

7.20~8.1 프론트 페이지 구현

8.1~8.15 마무리 및 배포

# preview
<details>
    <summary>자세히</summary>

![Animation](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/64159a73-28d6-48ba-a146-2d8a87ba695f)


![Animation3](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/89fc8593-cdf4-49fa-b4fa-7c419228b0ca)

![Animation4](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/f8c50b79-01ce-482a-8dc1-c92963d51897)

</details>


# Demo 및 배포
[데모 링크](https://master--mbtitestchat.netlify.app/)

Netlify로 배포됩니다
[배포용 Github](https://github.com/Lanvizu/mbtiTestProject4)

# 플로우차트

# 구현된 기능
메인페이지, 채팅페이지 이동

챗봇과 채팅

MBTI 추론결과 출력

결과 카카오톡 공유하기

# 데이터셋 및 모델 
<h5>Language Model</h5>
데이터

https://github.com/Ludobico/KakaoChatData 를 다시 정제하여 LoRA로 Colab에서 학습했습니다.

모델 : <a href="https://huggingface.co/EleutherAI/polyglot-ko-1.3b"><img src="https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/1614054059123-603481bb60e3dd96631c9095.png?w=200&h=200&f=face" height="20" />EleutherAI/polyglot-ko-1.3b</a>

학습 코드  <a href="https://colab.research.google.com/drive/1u3anPYeuJcsdFRaRMByMB4hGbkWAEiR1?usp=sharing"><img src="https://img.shields.io/badge/open in Colab-F9AB00?style=flat&logo=Google Colab&logoColor=white" /></a>

<h5>MBTI분류 Model</h5>
데이터

https://www.kaggle.com/datasets/zeyadkhalid/mbti-personality-types-500-dataset 를 정제하여 Colab에서 학습했습니다.

모델 : https://huggingface.co/bert-base-cased

학습 코드  <a href="https://colab.research.google.com/drive/1YurLnkVP5cMnbHwM1j9tN8yGQGfbiqAO?authuser=1"><img src="https://img.shields.io/badge/open in Colab-F9AB00?style=flat&logo=Google Colab&logoColor=white" /></a>

# 사용된 폰트/image
<a href="https://noonnu.cc/font_page/1136">폰트 : <img src="https://noonnucc-production.sfo2.cdn.digitaloceanspaces.com/202304/1680424033641026.png" height="25"/></a> 

react-icons SiProbot https://react-icons.github.io/react-icons/search?q=SiProbot

# api서버
![image](https://github.com/ldh-Hoon/Chatbot_Mbti_Test2/assets/139981434/90aab449-2e92-4854-8a6a-b6d21bb09f91)
모델 추론은 🤗Huggingface Space를 이용합니다. 
<a href="https://huggingface.co/spaces/ldhldh/chat_and_bert_rest-api-with-gradio "><img src="https://img.shields.io/badge/open in Huggingface-444444?style=flat&logo=Huggingface&logoColor=white" /></a>

# 경험한 것


# 개선할 점



