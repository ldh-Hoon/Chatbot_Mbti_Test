import asyncio
import aiohttp
import re, json, requests
from googletrans import Translator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse 
from django.http import JsonResponse
from gradio_client import Client as GrClient

translator = Translator()
gradio_client = GrClient("https://ldhldh-polyglot-ko-1-3b-peft-demo.hf.space/")
def convert_label_to_str(label):
    mbti_map = {
        "LABEL_0":"INTJ", "LABEL_1":"INTP", "LABEL_2":"INFJ", "LABEL_3":"INFP",
        "LABEL_4":"ISTJ", "LABEL_5":"ISTP", "LABEL_6":"ISFJ", "LABEL_7":"ISFP",
        "LABEL_8":"ENTJ", "LABEL_9":"ENTP", "LABEL_10":"ENFJ", "LABEL_11":"ENFP",
        "LABEL_12":"ESTJ", "LABEL_13":"ESTP", "LABEL_14":"ESFJ", "LABEL_15":"ESFP"
    }
    return mbti_map.get(label)
async def fetch_mbti(text):
    t = translator.translate(text, src='ko', dest='en').text
    str_trans = re.sub('[-=+,#/\?:^.@*\"※~ㆍ!』‘|\(\)\[\]`\'…》\”\“\’·]', '', t)
    API_URL = "https://api-inference.huggingface.co/models/Lanvizu/fine-tuned-klue-bert-base_model_11"
    headers = {"Authorization": "Bearer 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"} #read token
    
    max_retries = 5
    retry_interval = 5
    retries = 0
    while retries < max_retries:
        async with aiohttp.ClientSession() as session:
            async with session.post(API_URL, headers=headers, json={"inputs": f"{str_trans}"}) as response:
                try:
                    data = await response.json()
                    if isinstance(data, list):
                        return data[0]
                except json.JSONDecodeError:
                    pass
        retries += 1
        await asyncio.sleep(retry_interval)
    return None

@api_view(['POST', 'GET'])
def get_chatbot_response(request):
    if request.method == 'GET':
        user_input = request.GET.get('user_input', '')
    elif request.method == 'POST':
        user_input = request.data.get('message', '')  # 사용자의 입력을 가져옴

    print(user_input)
    # Gradio 클라이언트를 초기화
    # Gradio 클라이언트를 사용하여 챗봇에 요청 보내기
    result = gradio_client.predict(
        user_input,# str representing input in 'User input' Textbox component
		0.9,	# float, representing input in 'Top-p (nucleus sampling)' Slider component
		50,	# int, representing input in 'Top-k (nucleus sampling)' Slider component
		0.7,	# float, representing input in 'Temperature' Slider component
		20,	# int, representing input in 'Max New Tokens' Slider component
		1.2,	# float, representing input in 'repetition_penalty' Slider component
		fn_index=0
    )
    print(result)
    return Response(result)
@api_view(['POST', 'GET'])
def get_mbti(request):
    if request.method == 'GET':
        text = request.GET.get('user_input', '')
    elif request.method == 'POST':
        text = request.data.get('message', '')

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(fetch_mbti(text))
    print(result[0])
    return Response({'message': result[0]})
@api_view(['POST', 'GET'])
def get_yn_response(request):
    if request.method == 'GET':
        text = request.GET.get('user_input', '')
    elif request.method == 'POST':
        text = request.data.get('message', '')
    result = gradio_client.predict(
				text,	# str representing input in 'User input' Textbox component
				fn_index=2
    )
    return Response(result)