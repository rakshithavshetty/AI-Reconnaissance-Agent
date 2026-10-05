# AI Reconnaissance Agent
AI Reconnaissance Agent is a cybersecurity reconnaissance and AI-based risk assessment application designed to automate the collection, analysis, and interpretation of information about an authorized target.
The application collects reconnaissance information such as DNS records, WHOIS information, common subdomains, and selected open ports. The collected information is then analyzed using Groq AI to generate a security risk assessment, security findings, and recommendations.


## 📌 Project Overview
Traditional reconnaissance requires security professionals to use multiple tools and manually analyze the collected information.
The AI Reconnaissance Agent combines reconnaissance activities into a single application and uses Artificial Intelligence to analyze the collected information.

The system follows this workflow:
Target Domain / IP
        ↓
Target Validation
        ↓
Authorization Check
        ↓
DNS Enumeration
        ↓
WHOIS Lookup
        ↓
Subdomain Discovery
        ↓
Port Scanning
        ↓
Structured Reconnaissance Data
        ↓
Groq AI Analysis
        ↓
Risk Assessment
        ↓
Security Findings
        ↓
Recommendations
        ↓
Dashboard & PDF Report




# ✨ Features

- 🔍 Target domain and IPv4 validation
- 🌐 DNS record enumeration
- 📋 WHOIS information gathering
- 🔗 Common subdomain discovery
- 🔌 Selected port scanning
- 🤖 AI-powered security analysis
- 📊 Risk score from 0–100
- 🚦 Risk levels:
  - LOW
  - MEDIUM
  - HIGH
  - CRITICAL
- 🔎 AI-generated security findings
- 💡 AI-generated recommendations
- 📈 Reconnaissance summary dashboard
- 🕘 Browser-session scan history
- 📄 PDF security report generation
- 🔐 Authorization confirmation before scanning
- 🖥️ React-based web interface
- ⚙️ Flask REST API backend



# 🏗️ System Architecture

┌───────────────────────────────┐
│        React Frontend         │
│                               │
│  Target Input                 │
│  Dashboard                    │
│  Risk Assessment              │
│  Reconnaissance Results       │
│  Findings                     │
│  Recommendations              │
│  PDF Report                   │
└───────────────┬───────────────┘
                │
                │ HTTP / REST API
                ↓
┌───────────────────────────────┐
│         Flask Backend         │
│                               │
│        /api/scan              │
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│    Reconnaissance Modules     │
│                               │
│  ┌─────────┐                  │
│  │   DNS   │                  │
│  └─────────┘                  │
│                               │
│  ┌─────────┐                  │
│  │  WHOIS  │                  │
│  └─────────┘                  │
│                               │
│  ┌──────────────┐             │
│  │  Subdomains  │             │
│  └──────────────┘             │
│                               │
│  ┌──────────────┐             │
│  │ Port Scanner │             │
│  └──────────────┘             │
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│ Structured Reconnaissance     │
│ Data                          │
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│          Groq AI              │
│                               │
│  Risk Assessment              │
│  Findings                     │
│  Recommendations              │
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│        Security Dashboard     │
└───────────────────────────────┘



# 🛠️ Technologies Used

## Frontend
- React.js
- Vite
- JavaScript
- Axios
- CSS
- jsPDF

## Backend
- Python
- Flask
- Flask-CORS
- Requests
- dnspython
- python-whois
- python-dotenv

## Artificial Intelligence
- Groq API
- `openai/gpt-oss-20b`

## Development Tools
- PyCharm
- Git
- GitHub
- Postman


# 📁 Project Structure
AI-Reconnaissance-Agent/
│
├── 📄 README.md
│
├── 📁 backend/
│   │
│   ├── 📁 ai/
│   │   └── 📄 groq_analyzer.py
│   │
│   ├── 📁 recon/
│   │   ├── 📄 dns.py
│   │   ├── 📄 whois.py
│   │   ├── 📄 subdomain.py
│   │   └── 📄 ports.py
│   │
│   ├── 📁 reports/
│   │
│   ├── 📁 utils/
│   │   ├── 📄 __init__.py
│   │   └── 📄 target_validation.py
│   │
│   ├── 📄 app.py
│   ├── 📄 requirements.txt
│   ├── 📄 .env
│   └── 📄 .gitignore
│
└── 📁 frontend/
    │
    ├── 📁 src/
    │   │
    │   ├── 📁 assets/
    │   │   └── 📄 recon-logo.png
    │   │
    │   ├── 📁 components/
    │   │   ├── 📄 TargetInput.jsx
    │   │   ├── 📄 RiskCard.jsx
    │   │   ├── 📄 ReconSection.jsx
    │   │   ├── 📄 Findings.jsx
    │   │   ├── 📄 Recommendations.jsx
    │   │   ├── 📄 SummaryCards.jsx
    │   │   └── 📄 ScanHistory.jsx
    │   │
    │   ├── 📁 utils/
    │   │   ├── 📄 targetValidation.js
    │   │   └── 📄 pdfReport.js
    │   │
    │   ├── 📄 App.jsx
    │   ├── 📄 main.jsx
    │   └── 📄 index.css
    │
    ├── 📄 package.json
    └── ...


# 🔍 Reconnaissance Modules
## 1. DNS Enumeration
The DNS module retrieves common DNS records for the target domain.
The application checks:
- A
- AAAA
- MX
- NS
- TXT
- CNAME

Example:
DNS
 ├── A
 ├── AAAA
 ├── MX
 ├── NS
 ├── TXT
 └── CNAME

## 2. WHOIS Lookup
The WHOIS module retrieves available domain registration information.
The application collects information such as:
- Domain name
- Registrar
- Creation date
- Expiration date
- Name servers
- Domain status


## 3. Subdomain Discovery
The application checks a controlled list of common subdomains.
Currently checked subdomains include:
www
mail
api
dev
test
admin
blog
staging
For each discovered subdomain, the application records the HTTP status code when accessible.



## 4. Port Scanning
The application checks selected commonly used ports.

| Port | Service |
|------|---------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 8080 | HTTP-Alt |
The result indicates whether the selected port is:
- Open
- Closed
- Error


# 🤖 AI Analysis
After reconnaissance is completed, the collected information is converted into structured data and passed to Groq AI.
The AI analyzes the supplied reconnaissance information and produces:
Risk Score
Risk Level
Summary
Security Findings
Recommendations


## Risk Score
The risk score ranges from:
0 - 100

The application supports four risk levels:
LOW
MEDIUM
HIGH
CRITICAL

The AI is instructed to:
- Analyze only the supplied reconnaissance data
- Avoid inventing vulnerabilities
- Clearly distinguish observations from assumptions
- Return structured JSON
- Provide security recommendations


# 📊 Dashboard
The frontend provides a security-focused dashboard.
## Target Input
The user can enter an authorized:
Domain or:IPv4 Address

Example:
example.com or:8.8.8.8


## Security Risk Assessment

The dashboard displays:

- Overall risk score
- Risk level
- Risk meter
- AI security assessment

Example:
Security Risk Assessment
10 / 100
Risk Level: LOW


## Reconnaissance Summary

The dashboard provides a summary of:
DNS Records
Subdomains
Open Ports

Example:
DNS Records     6
Subdomains      2
Open Ports      1


## Security Findings
The AI-generated findings are displayed with severity levels:
LOW
MEDIUM
HIGH
CRITICAL

Each finding can contain:
- Severity
- Title
- Description
- Recommendation


## Recommendations
The AI generates recommendations based on the reconnaissance information.
Examples of recommendation categories may include:
- Service exposure
- DNS configuration
- Subdomain exposure
- Network service hardening
- Security configuration improvements


# 🕘 Scan History
The application maintains scan history during the current browser session.
Each history entry contains:
- Target
- Scan timestamp
- Risk level
- Risk score
- Number of findings

Example:
Target: example.com
Risk: LOW
Score: 10/100
Findings: 0
The current implementation stores scan history only for the active browser session.


# 📄 PDF Reports
The application provides a PDF report generation feature.
The generated report contains:
- Target information
- Scan date
- Risk level
- Risk score
- AI summary
- DNS records
- WHOIS information
- Discovered subdomains
- Port scan results
- Security findings
- Recommendations
The report can be downloaded directly from the dashboard.


# 🔐 Target Validation
Before a scan starts, the target is validated.
The application accepts:
Domain names
IPv4 addresses

Valid examples:
example.com
google.com
8.8.8.8

Invalid examples:
http://example.com
https://example.com
example.com/path
invalid target
The application also prevents unsupported URL-style inputs.


# 🔐 Authorization

The application requires authorization confirmation before starting reconnaissance.
The frontend sends:
json
{
    "target": "example.com",
    "authorized": true
}

The backend verifies that:
authorized == true

If authorization is not confirmed, the scan is rejected.



# 🔌 API
## Scan Endpoint
POST /api/scan

### Request

json
{
    "target": "example.com",
    "authorized": true
}

### Successful Response

json
{
    "success": true,
    "target": "example.com",
    "reconnaissance": {
        "target": "example.com",
        "dns_records": {},
        "whois": {},
        "subdomains": [],
        "ports": {}
    },
    "ai_analysis": {
        "risk_score": 10,
        "risk_level": "LOW",
        "summary": "Security assessment summary",
        "findings": [],
        "recommendations": []
    }
}


# ⚙️ Backend Installation
## Step 1: Open the Project
Open the project in PyCharm.
AI-Reconnaissance-Agent


## Step 2: Open Terminal
Navigate to the backend:
cd backend


## Step 3: Create Virtual Environment
python -m venv .venv


## Step 4: Activate Virtual Environment
On Windows:
.venv\Scripts\activate


After activation:
(.venv)
should appear in the terminal.


## Step 5: Install Dependencies
pip install -r requirements.txt


# 🔑 Environment Configuration
Create:
backend/.env
Add:
GROQ_API_KEY=your_groq_api_key
Replace:your_groq_api_key
with your actual Groq API key.


## Important
Never upload your API key to GitHub.
The `.env` file should be included in `.gitignore`.


# ▶️ Running the Backend

From:
backend/

run:
python app.py

The backend will run at:
http://127.0.0.1:5000



# 🌐 Frontend Installation
Open another terminal.
Navigate to:
cd frontend

Install the required packages:
npm install

# ▶️ Running the Frontend
Run:
npm run dev

The Vite development server will normally run at:
http://localhost:5173
Open this address in your browser.


# 🧪 Testing
The backend can be tested using:
- Browser
- PowerShell
- Postman

Example API request:
json
{
    "target": "example.com",
    "authorized": true
}

Example PowerShell command:
$response = Invoke-RestMethod `
    -Uri "http://127.0.0.1:5000/api/scan" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"target":"example.com","authorized":true}'

$response | ConvertTo-Json -Depth 10


# 🔄 Complete Application Workflow
┌──────────────────────┐
│ User enters target   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Target Validation    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Authorization Check  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ DNS Enumeration      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ WHOIS Lookup          │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Subdomain Discovery  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Port Scanning        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Structured Data      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Groq AI Analysis     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Risk Assessment      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Findings             │
│ Recommendations      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Dashboard            │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ PDF Security Report  │
└──────────────────────┘


# 🔒 Security and Ethical Use
This project is intended for:
- Educational purposes
- Cybersecurity learning
- Authorized security assessments
- Security research
- Penetration-testing support
- Training environments
Only scan systems that you own or have explicit permission to assess.
Do not use this application to perform unauthorized reconnaissance against systems, networks, or websites.
The application is designed for reconnaissance and analysis and does not perform exploitation.


# 🚀 Future Enhancements
The following features can be added in future versions:
- Evidence-based risk scoring
- Advanced technology stack detection
- Expanded subdomain discovery
- Improved service identification
- Persistent database-backed scan history
- User authentication
- Role-based access control
- Real-time monitoring
- Attack-surface visualization
- Advanced security dashboards
- Cloud deployment
- More reconnaissance data sources
- Improved AI risk classification
- Automated report generation
- Historical risk comparison


# 📌 Limitations
The current version has some limitations:
- Subdomain discovery uses a controlled list of common subdomains.
- Port scanning is limited to selected common ports.
- Scan history is stored only during the current browser session.
- AI risk scoring depends on the reconnaissance information supplied to the AI.
- The current application does not perform exploitation or vulnerability verification.
- Technology stack detection is limited in the current implementation.


# 👨‍💻 Author
Rakshitha Shetty
AI Reconnaissance Agent


# ⚠️ Disclaimer
This project is developed for educational, research, and authorized cybersecurity assessment purposes only.
Only perform reconnaissance against systems for which you have explicit authorization.
The developer is not responsible for unauthorized scanning, security testing, or misuse of this application.
