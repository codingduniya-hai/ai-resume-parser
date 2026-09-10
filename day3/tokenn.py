import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API KEY KHAAN HAI")

client=Groq(api_key=my_api_key)

model="openai/gpt-oss-120b"
role="user"
## 3 prompt
prompt1 = "hi!"
prompt2 = "Explain time travel in detail"
prompt3 = "write a essay on time travel in 1000 words"

prompts=[prompt1, prompt2 , prompt3]
for prompt in prompts:
    message={
    "role":role,
    "content":prompt

}
## message me role and content


messages=[ message]

response=client.chat.completions.create(model=model, messages=messages,max_tokens=50)
##print(response)

usage=response.usage
print(f"Prompt:{prompt} --> your_tokens:{usage.prompt_tokens} completions_tokens:{usage.completion_tokens}  total tokens: {usage.total_tokens}  Finish Reason: {response.choices[0].finish_reason}")
