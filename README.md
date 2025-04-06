# 🎉 EventEase API

**EventEase** is a backend API built using **Node.js**, **Express.js**, and **MongoDB**. It allows you to manage **events**, **users (organizers)**, and **assignments** efficiently through RESTful routes.

---

## 🚀 Features

### ✅ Events Management

- Get all events  
- Get event by ID  
- Create a new event  
- Update an existing event  
- Delete an event  

### ✅ Users Management

- Get all users  
- Get user by ID  
- Create a new user  
- Update an existing user  
- Delete a user  

### ✅ Assignments Management

- View all assignments  
- Filter assignments by `userId` or `eventId`  
- Assign a user to an event *(only if both exist)*  
- Delete:
  - All assignments of a specific `userId`  
  - All assignments of a specific `eventId`  
  - A specific assignment using both `userId` and `eventId`  

---

## 📁 Project Structure

```
EventEase/
│
├── utilis/             # Custom error-handling class that standardizes error messages and status codes
├── models/             # Mongoose models for users, events, and assignments
├── routes/             # Express routes for each module
├── .env                # Environment variables (not pushed to GitHub)
├── index.js            # Entry point
├── .gitignore
└── README.md
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kg-06/EventEase.git
cd EventEase
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

> ⚠️ Never share your real MongoDB URI. Use environment variables instead.

---

### 4️⃣ Run the Server

```bash
node index.js
```

Expected console output:

```
MongoDB connected
Server is running on http://localhost:3000
```

---

## 📬 Postman Collection

Test all routes using this Postman collection:  
🔗 [Postman Collection for EventEase](https://www.postman.com/flight-specialist-52013161/api-by-kg/collection/17gdr8f/eventease?action=share&creator=42711824)

> 💡 Tip: Install the Postman **Desktop Agent** if needed:  
[https://www.postman.com/downloads/postman-agent/](https://www.postman.com/downloads/postman-agent/)

---

## 🌐 API Endpoints

### 📌 Events API (`/events`)

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| GET    | `/events`        | Get all events              |
| GET    | `/events/:id`    | Get event by ID             |
| POST   | `/events`        | Add a new event (JSON body) |
| PUT    | `/events/:id`    | Update event by ID          |
| DELETE | `/events/:id`    | Delete event by ID          |

---

### 📌 Users API (`/users`)

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| GET    | `/users`         | Get all users                |
| GET    | `/users/:id`     | Get user by ID               |
| POST   | `/users`         | Add a new user (JSON body)   |
| PUT    | `/users/:id`     | Update user by ID            |
| DELETE | `/users/:id`     | Delete user by ID            |

---

### 📌 Assignments API (`/assignments`)

| Method | Endpoint                                 | Description                                                  |
|--------|------------------------------------------|--------------------------------------------------------------|
| GET    | `/assignments`                           | Get all assignments                                          |
| GET    | `/assignments/organizer/:userId`         | Get assignments by userId                                    |
| GET    | `/assignments/event/:eventId`            | Get assignments by eventId                                   |
| POST   | `/assignments`                           | Assign user to event (JSON body with `userId` and `eventId`) |
| DELETE | `/assignments/user/:userId`              | Delete all assignments of a user                             |
| DELETE | `/assignments/event/:eventId`            | Delete all assignments for an event                          |
| DELETE | `/assignments?userId=..&eventId=..`      | Delete a specific assignment                                 |

---

## 🧠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **dotenv**
- **morgan**

---

## 🙌 Author

**Made with ❤️ by** 

[**Keshav Garg**](https://github.com/kg-06)
---
[**Harshita Sharma**](https://github.com/HarshitaSharma-7/HarshitaSharma-7)
---
[**Noor Gumber**](https://github.com/noorgumber/noorgumber)
---
