import os
import json

from dotenv import load_dotenv
from groq import Groq


# Load .env
load_dotenv()

# Get API key
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not configured")


# Create Groq client
client = Groq(api_key=api_key)


SYSTEM_PROMPT = """
You are an AI cybersecurity reconnaissance analysis assistant.

You analyze reconnaissance information collected from an
authorized security assessment.

Do not perform exploitation.

Do not invent vulnerabilities.

Only report observations supported by the supplied data.

Analyze:

- IP addresses
- DNS records
- discovered subdomains
- open ports
- services
- technology information

Your job is to provide a risk assessment based ONLY
on the supplied reconnaissance information.

Return ONLY valid JSON.

The JSON must have exactly this structure:

{
    "risk_score": 0,
    "risk_level": "LOW",
    "summary": "",
    "findings": [
        {
            "severity": "LOW",
            "title": "",
            "description": "",
            "recommendation": ""
        }
    ],
    "recommendations": []
}

Rules:

- risk_score must be between 0 and 100.
- risk_level must be LOW, MEDIUM, HIGH, or CRITICAL.
- findings must be an array.
- recommendations must be an array.
- Do not include Markdown.
- Do not include ```json.
- Do not add text outside the JSON object.
- Clearly distinguish observed facts from assumptions.
"""


def analyze_recon(recon_data):

    user_prompt = f"""
Analyze the following reconnaissance information.

RECONNAISSANCE DATA:

{json.dumps(recon_data, indent=4)}

Return ONLY the requested JSON object.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],

        temperature=0.1
    )

    content = response.choices[0].message.content.strip()

    # Convert AI response from text to Python dictionary
    try:

        analysis = json.loads(content)

        return analysis

    except json.JSONDecodeError:

        return {
            "risk_score": 0,
            "risk_level": "UNKNOWN",
            "summary": "AI returned an invalid JSON response.",
            "findings": [],
            "recommendations": [],
            "raw_response": content
        }