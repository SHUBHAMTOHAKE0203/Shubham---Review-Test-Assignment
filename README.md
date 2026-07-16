#  Online Lecture Scheduling Module

An elegant, conflict-free scheduling ecosystem built using the **MERN Stack** (MongoDB, Express, React, Node.js). This module features a comprehensive administrative control dashboard to manage courses and schedule lecture batches, paired with a dynamic instructor portal that simulates personalized profiles without login friction.

The system incorporates robust **backend-level calendar validation** to prevent scheduling overlaps, ensuring that no instructor can be assigned to multiple lectures on the same calendar date.

---

##  Key Functional Features

* **Admin Dashboard Profile:**
    * **Instructor Roster Index:** View all instructors available in the database system.
    * **Course Blueprint Portfolios:** Create and manage courses with designated attributes (Name, Level, Description, Image Link).
    * **Multiple Batch Assignment:** Map independent batch segments onto existing course baselines after they are created.
    * **Collision Avoidance System:** Automated backend blocks preventing double-booking an instructor on any single date.
* **Instructor Gateway Console:**
    * **Simulated Session Switching:** Dropdown profile simulator to seamlessly view any instructor's unique agenda.
    * **Personalized Lectures Timeline Grid:** Renders comprehensive data cards detailing all assigned lectures, batch identifiers, images, and normalized dates.

---

##  Project Workspace Directory Tree

```text
lecture-scheduler/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB Atlas connection setup
│   ├── models/
│   │   ├── Course.js          # Course schema definition blueprint
│   │   ├── Instructor.js      # Faculty record structure details
│   │   └── Schedule.js        # Timeline transaction data model
│   ├── routes/
│   │   ├── courseRoutes.js    # Course endpoints
│   │   ├── instructorRoutes.js# Instructor roster & seed scripts
│   │   └── scheduleRoutes.js  # Scheduler allocation & validation engine
│   ├── server.js              # Application entrypoint & middleware hub
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx     # Nav bar with global view toggle
    │   │   ├── AdminPanel.jsx # Dashboard control matrix interfaces
    │   │   └── InstructorPanel.jsx # Profile-filtered agenda panel
    │   ├── App.jsx            # State dashboard routing wrapper
    │   ├── index.css          # Custom user interface presentation rules
    │   └── main.jsx           # Vite application build root
    └── package.json

```

---

##  Installation & Setup Instructions

### 1. Prerequisites

* **Node.js** (v18+ recommended)
* **MongoDB Atlas Cloud Account** (or a local MongoDB instance running)

### 2. Backend Environment Configurations

Navigate into the backend workspace directory:

```bash
cd backend

```

Create a `.env` file in the root of the `/backend` folder and populate it with your environment coordinates:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/lecture_scheduler?retryWrites=true&w=majority

```

Install dependencies and launch the server application engine runtime:

```bash
npm install
npm run start

```

*Expected Terminal Message:* `Database connected successfully!`

### 3. Frontend Client Build

Open a new secondary terminal window and jump into the frontend directory workspace:

```bash
cd frontend
npm install
npm run dev

```

Open your browser and navigate to `http://localhost:5173`.

---

##  Backend API Routes Architecture Reference

All system API endpoints accept and return JSON payloads. The base connection endpoint URL is `http://localhost:5000/api`.

###  Instructor Routes (`/api/instructors`)

| HTTP Method | Route Endpoint | Description | Payload Body Requirements |
| --- | --- | --- | --- |
| **GET** | `/` | Retrieves a list of all instructors currently saved in the database. | *None* |
| **POST** | `/seed` | Utility script endpoint that drops existing entries and seeds random mock faculty profiles for quick testing. | *None* |

###  Course Routes (`/api/courses`)

| HTTP Method | Route Endpoint | Description | Payload Body Requirements |
| --- | --- | --- | --- |
| **GET** | `/` | Fetches the complete repository index of registered courses. | *None* |
| **POST** | `/` | Registers a new course blueprint into the platform database. | `{ "name": String, "level": "Beginner" | "Intermediate" | "Advanced", "description": String, "image": String }` |

###  Schedule & Conflict Validation Routes (`/api/schedules`)

| HTTP Method | Route Endpoint | Description | Payload Body Requirements |
| --- | --- | --- | --- |
| **GET** | `/` | Fetches the master ledger timeline containing every scheduled block across all courses and instructors. | *None* |
| **GET** | `/instructor/:instructorId` | Fetches the personalized lecture agenda timeline filtered specifically for the given instructor ID. | *URL Route Parameter:* `instructorId` |
| **POST** | `/` | Evaluates schedule criteria, runs collision tracking checks, and schedules a new batch lecture if safe. | `{ "courseId": ObjectId, "instructorId": ObjectId, "batchName": String, "date": "YYYY-MM-DD" }` |

---

##  Business Logic: Conflict Validation Design

The heart of the application is the collision avoidance engine running within the `POST /api/schedules` endpoint workflow.

```javascript
// Date Normalization Mechanism
const targetDate = new Date(date);
targetDate.setUTCHours(0, 0, 0, 0); 

```

* **Isolation Optimization:** When a date selection payload lands on the API endpoint, the server extracts its midnight values via `setUTCHours(0, 0, 0, 0)`. This addresses timezone discrepancies and locks checking logic exactly to the day string level.
* **Database Queries Scan:** The database queries the schedules collections executing an internal check: `Schedule.findOne({ instructor: instructorId, date: targetDate })`.
* **Guard Block Actions:** If an existing schedule is found matching that instructor on that day, the engine throws a `400 Bad Request` execution rejection status. The frontend catches this response error object and flashes a warning message on screen, completely preventing double-booking.

```

```
