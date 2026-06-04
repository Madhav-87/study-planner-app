# IntelliStudy — AI-Powered Study Planner

IntelliStudy is a full-stack web application that helps students create personalized, AI-generated study plans. Upload your syllabus as a PDF, set your exam date and daily study hours, and the app builds a complete day-by-day schedule powered by Google Gemini AI. A built-in Pomodoro timer keeps you focused during every session.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [App Pages & Routes](#app-pages--routes)
- [API Documentation](#api-documentation)
- [How It Works](#how-it-works)

---

## Features

- **AI Study Plans** — Upload a PDF syllabus and generate a full day-by-day study schedule from today to your exam date using Google Gemini 2.5 Flash
- **Personalised Scheduling** — Subjects are distributed evenly across days, and topics progress from basic to advanced based on your chosen learning style
- **Pomodoro Timer** — Built-in focus timer with session tracking, total study time counter, and optional audio alerts
- **PDF Download** — Export your generated study plan as a downloadable PDF directly from the app
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile devices
- **Secure API** — Backend secured with Helmet headers and CORS origin control

---

## Tech Stack

### Client

| Package | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests to the backend |
| React Toastify | Toast notifications |
| jsPDF | Client-side PDF generation for plan download |
| Bootstrap 5 | Base utility styles |
| React Device Detect | Mobile/desktop layout switching |

### Server

| Package | Purpose |
|---|---|
| Express v5 | HTTP server & routing |
| Multer | Multipart PDF upload handling (memory storage) |
| pdf-parse | PDF text extraction from buffer |
| @google/generative-ai | Google Gemini AI study plan generation |
| Helmet | HTTP security headers |
| CORS | Cross-origin request control |
| dotenv | Environment variable management |
| fs-extra | Extended file system utilities |

---

## Project Structure

```
intellistudy/
├── client/                          # React frontend (Create React App)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── App.js                   # Root component with BrowserRouter
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx        # Route definitions
│   │   ├── pages/
│   │   │   ├── Login/               # Landing page with feature cards
│   │   │   │   ├── Login.js
│   │   │   │   └── Login.css
│   │   │   ├── Dashboard/           # Study plan creation & management
│   │   │   │   ├── DashBoard.js
│   │   │   │   └── Dashboard.css
│   │   │   ├── StudyPlan/           # Modal viewer & PDF export
│   │   │   │   ├── StudyPlan.jsx
│   │   │   │   └── studyPlan.css
│   │   │   └── Pomodoro/            # Focus timer with audio
│   │   │       ├── Pomodoro.js
│   │   │       └── Pomodoro.css
│   │   ├── components/
│   │   │   ├── Header/              # Shared site header
│   │   │   └── Loader/              # Full-screen loading spinner
│   │   └── styles/
│   │       └── index.css            # Global styles
│   ├── .env                         # Client environment variables
│   └── package.json
│
└── server/                          # Node.js/Express backend
    ├── server.js                    # App entry point & middleware setup
    ├── routes/
    │   └── router.js                # Route definitions + Multer config
    ├── controllers/
    │   └── controller.js            # Request orchestration logic
    ├── services/
    │   ├── pdfExtractor.cjs         # PDF text extraction (CommonJS)
    │   └── chatbot/
    │       └── genSchedule.js       # Gemini AI prompt & response parsing
    └── package.json
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- A **Google Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/)

---

## Installation

Clone the repository and install dependencies for both client and server:

```bash
git clone https://github.com/Madhav-87/study-planner-app
cd intellistudy

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## Environment Variables

### Client — `client/.env`

```env
REACT_APP_API=http://localhost:7000
```

| Variable | Description |
|---|---|
| `REACT_APP_API` | Base URL of the backend API |

### Server — `server/.env`

Create a `.env` file inside the `server/` directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
CLIENT_URL=http://localhost:3000
SERVER_PORT=7000
```

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `CLIENT_URL` | Frontend origin allowed by CORS |
| `SERVER_PORT` | Port the Express server listens on |

---

## Running the App

Both the client and server must be running at the same time. Open two terminal windows.

**Terminal 1 — Start the server:**

```bash
cd server
npm start
```

```
Server is running on port: 7000
```

**Terminal 2 — Start the client:**

```bash
cd client
npm start
```

The React app will open at `http://localhost:3000` and send API requests to `http://localhost:7000`.

---

## App Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Login / Landing | Hero section, feature cards, and a "Get Started" call to action |
| `/dashboard` | Dashboard | Create a new study plan by uploading a syllabus PDF and entering study preferences |
| `/dashboard/timer` | Pomodoro Timer | 25-minute focus timer with session counter, total study time, and sound toggle |

### Study Plan Modal

The study plan is displayed in a modal overlay on the Dashboard. It shows a week-by-week, day-by-day breakdown of subjects and topics with a **Download PDF** button to export the full plan.

---

## API Documentation

Base URL: `http://localhost:7000`

---

### `GET /`

Health check to confirm the server is running.

**Response** `200 OK`

```json
{
  "data": "Server is listening"
}
```

---

### `POST /chatbot/input`

Generates a full AI-powered study plan from a PDF syllabus and user inputs.

**Content-Type:** `multipart/form-data`

**Request Fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `syllabus` | File (PDF) | Yes | PDF syllabus file — max 10 MB, must be text-based (not scanned) |
| `subjects` | String | Yes | Comma-separated subject names e.g. `Physics, Chemistry, Maths` |
| `examDate` | String | Yes | Exam date in `YYYY-MM-DD` format |
| `hoursPerDay` | Number | Yes | Total study hours available per day |
| `learningStyle` | String | Yes | One of: `Learn by seeing`, `Learn by listening`, `Learn by doing`, `Learn by reading` |
| `todayDate` | String | Yes | Today's date in `YYYY-MM-DD` format (auto-set by the client) |

**Success Response** `200 OK`

```json
{
  "message": {
    "title": "Physics & Chemistry Study Plan",
    "generatedOn": "2025-06-04",
    "totalWeeks": 4,
    "weeklyPlan": {
      "1": [
        {
          "day": "Monday",
          "date": "2025-06-04",
          "break": "5 min break",
          "subjects": [
            {
              "name": "Physics",
              "topic": "Introduction to Mechanics",
              "duration": "1.5 hrs"
            },
            {
              "name": "Chemistry",
              "topic": "Atomic Structure Basics",
              "duration": "1.5 hrs"
            }
          ]
        }
      ],
      "2": [ "..." ]
    }
  }
}
```

**Error Responses**

| Scenario | Status | Response Body |
|---|---|---|
| Scanned / non-text PDF | `200` | `{ "message": "Fail to process" }` |
| AI generation failure | `500` | `{ "message": "Fail" }` |
| Server / runtime error | `500` | `{ "message": "<error stack>", "success": false }` |

---

## How It Works

```
User fills form + uploads PDF
        │
        ▼
[Client] POST /chatbot/input  (multipart/form-data)
        │
        ▼
[Server] Multer stores PDF in memory buffer
        │
        ▼
[pdfExtractor.cjs] pdf-parse reads buffer → extracts raw text
        │  If extracted text < 100 chars → returns "Fail to process"
        ▼
[genSchedule.js] Builds prompt combining user inputs + syllabus text
        │  Sends to Gemini 2.5 Flash with strict system instruction:
        │    · One entry per calendar day (todayDate → examDate)
        │    · Subjects distributed evenly, topics basic → advanced
        │    · Total daily duration must equal hoursPerDay
        │    · Return raw JSON only — no markdown, no summaries
        ▼
[Server] Parses Gemini JSON response, sends to client
        │
        ▼
[Client] Renders weekly plan in modal · Enables PDF download
```

The Gemini system instruction enforces a strict output contract so the client can safely parse and render the response without any sanitisation step.

---

## Author

**Madhav Bondhare**
