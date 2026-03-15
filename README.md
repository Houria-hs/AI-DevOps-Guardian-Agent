# 🛡️ DevOps Guardian

![Hackathon](https://img.shields.io/badge/Microsoft-Hackathon-blue?style=for-the-badge&logo=microsoft)
[![Microsoft AI Dev Days](https://img.shields.io/badge/Hackathon-Microsoft_AI_Dev_Days-blue?logo=microsoft)](https://innovationstudio.microsoft.com/)
[![GitHub Copilot](https://img.shields.io/badge/Built_with-GitHub_Copilot-8E44AD?logo=github-copilot&logoColor=white)](https://github.com/features/copilot)
![Azure AI](https://img.shields.io/badge/Azure-AI%20Foundry-0078D4?style=for-the-badge&logo=microsoftazure)
![OpenAI](https://img.shields.io/badge/Azure-OpenAI-412991?style=for-the-badge&logo=openai)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)

### Multi-Agent AI Orchestration for Secure & Scalable Architecture

DevOps Guardian is an **AI-powered architectural auditor** that performs deep analysis of GitHub repositories.

By orchestrating a team of specialized AI agents through **Azure AI Foundry**, it transforms complex repository metadata into a **prioritized and actionable roadmap** for security, code quality, and CI/CD maturity.

Instead of overwhelming developers with thousands of alerts, DevOps Guardian focuses on **meaningful architectural insights and practical fixes**.

---

# 🎯 The Challenge (The Security vs Velocity Paradox)

Modern development moves fast. Really fast.  
But **security reviews and architecture audits move slow**.

This creates a painful tension: **ship quickly or build safely**.

## ❌ The Problem

### Context-Blind Tooling
Traditional SAST tools generate thousands of generic alerts.  
Developers spend hours filtering **noise instead of solving real risks**.

### The Expertise Gap
Advanced security auditing requires **senior-level experience** that many teams, especially startups or junior developers simply don't have.

### Fragmented Feedback
Information lives across logs, dashboards, and reports.  
Teams become **reactive instead of proactive**.

---

## ✅ The Solution

DevOps Guardian introduces **Autonomous AI Architects** that analyze repositories with contextual reasoning.

### Intelligence Over Rules
Instead of rigid pattern matching, AI agents analyze **intent, workflows, and architecture**.

### Orchestrated Specialization
Three specialized AI agents perform focused audits:

- **Security Agent** — detects vulnerabilities and risky configurations  
- **Code Quality Agent** — evaluates maintainability and project structure  
- **CI/CD Agent** — analyzes pipelines and deployment workflows  

### Remediation-First Design
Every issue includes **actionable recommendations and configuration fixes**, acting like a **senior DevOps mentor for your repository**.

---

# 🧠 System Architecture

DevOps Guardian follows a **Managed Controller-Service Pattern**, ensuring scalability and clean separation of concerns.

## 🔄 Pipeline Flow

### 1️⃣ Ingestion
User provides a **GitHub repository URL**.

### 2️⃣ Context Retrieval
GitHub Service fetches:

- repository structure  
- dependency trees  
- workflow configurations  

### 3️⃣ Agent Orchestration
The **Agent Orchestrator** distributes contextual data to specialized AI agents.

### 4️⃣ Intelligence Layer
**Azure AI Foundry** processes requests in parallel using advanced reasoning models.

### 5️⃣ Aggregation
Results are merged into a unified **JSON report** and streamed to the UI.

---

# ⚡ Key Features

### 🤖 Sequential Multi-Agent Audit
Independent AI agents analyze:

- Security  
- Code Quality  
- CI/CD pipelines  

### 📡 Real-Time Process Feed
A **Real-Time Agent Execution Log** visualizes the AI's reasoning process live.

### 💡 Actionable Remediation
Each finding includes a **clear recommendation and code-level fix**.

### 🧱 Managed Backend Architecture
Structured using **routes, controllers, and services** for production-grade reliability.

### 📊 Interactive Health Score
Repositories receive a **0–10 health score** with visual severity indicators.

---

## 🤖 Built with GitHub Copilot
This project was developed using **GitHub Copilot** as a primary pair-programmer. 
- **AI-Assisted Orchestration:** Leveraging Copilot to rapidly prototype the multi-agent logic and state management.
- **Enhanced Productivity:** Utilizing Copilot's contextual suggestions to ensure clean, modular code following the Managed Controller-Service pattern.
- **Unit Testing & Documentation:** Streamlining the creation of technical documentation and edge-case handling.

---

# 🛠️ Technical Stack

## Frontend
- React 19 (Vite)
- Tailwind CSS v4
- Lucide Icons

## Backend
- Node.js
- Express.js
- TypeScript

## AI & Cloud
- Azure AI Foundry
- Azure OpenAI Service

## Data Source
- GitHub REST API

---

# ⚙️ Installation & Setup

## 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
AZURE_OPENAI_KEY=your_key
AZURE_OPENAI_ENDPOINT=your_endpoint
# If using specific deployments:
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
```

Run the server:

```bash
npm start
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:
```
# For local development:
VITE_API_URL=http://localhost:5000

# For production (Azure App Service):
 VITE_API_URL=[https://your-backend-service.azurewebsites.net](https://your-backend-service.azurewebsites.net)
```

---

# 🚀 Microsoft Technologies Used

### Azure AI Foundry
Implemented using a custom Agent Orchestration Layer to manage parallel processing and structured output from multiple LLM personas.

### Azure OpenAI Service
Powering the reasoning engine behind architectural audits.

### GitHub API
Used for repository metadata, workflows, and dependency analysis.

---

# 🎥 Demo & Submission

🎬 **Video Walkthrough**  
(https://youtu.be/QrVwVdGaFT0)

---

# 🤝 Contributor

### Houria Hasbellaoui

**Full-Stack Developer & AI Enthusiast**

- GitHub Profile: https://github.com/Houria-hs
- Microsoft Learn Username: Houria Hasbellaoui

---

✨ **DevOps Guardian turns repository chaos into architectural clarity.**
