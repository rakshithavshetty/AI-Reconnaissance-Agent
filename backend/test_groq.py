import os

from dotenv import load_dotenv
from groq import Groq


# Load variables from .env
load_dotenv()

# Get API key
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not configured")


# Create Groq client
client = Groq(api_key=api_key)


# Send request to Groq
response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {
            "role": "system",
            "content": "You are a cybersecurity assistant."
        },
        {
            "role": "user",
            "content": "What is reconnaissance in cybersecurity?"
        }
    ]
)


# Print AI response
print("\n========== GROQ RESPONSE ==========\n")
print(response.choices[0].message.content)