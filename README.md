# EventEase API

EventEase is a simple event management API built using Node.js and Express. It allows users to manage events, organizers, and assignments efficiently.

## 🚀 Features
### **Events Management:**
- View all events
- View event by ID
- Add an event
- Update an event
- Delete an event

### **Users Management:**
- View all users
- View user by ID
- Add a user
- Update a user
- Delete a user

### **Assignments Management:**
- View all assignments
- View assignments by `userId`
- View assignments by `eventId`
- Add an assignment
- Delete all assignments by `userId`
- Delete all assignments by `eventId`
- Delete a specific assignment using both `userId` and `eventId`

## 📌 Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/kg-06/EventEase.git
cd EventEase
```

### **2️⃣ Initialize Node.js**
Since `package.json` is not included, initialize Node manually:
```sh
npm init -y
```

### **3️⃣ Install Dependencies**
```sh
npm install express
```

### **4️⃣ Run the Server**
```sh
node index.js
```
The API will be running at: `http://localhost:3000`

## 🔹 Postman Collection  
You can test all API requests using this Postman collection:   
https://www.postman.com/flight-specialist-52013161/api-by-kg/collection/17gdr8f/eventease?action=share&creator=42711824

**Note-** To run the above postman collection you need to download Postman Desktop Agent:     
https://www.postman.com/downloads/postman-agent/

## 📌 API Endpoints

### **Events API** (`/events`)
- **GET** `/events` → Get all events
- **GET** `/events/:id` → Get event by ID
- **POST** `/events?id=1&name=GDG event&date=08-03-2025` → Add an event
- **PUT** `/events/:id?name=Updated Event&date=09-03-2025` → Update an event
- **DELETE** `/events/:id` → Delete an event

### **Users API** (`/users`)
- **GET** `/users` → Get all users
- **GET** `/users/:id` → Get user by ID
- **POST** `/users?id=0795&name=Keshav Garg` → Add a user
- **PUT** `/users/:id?name=Updated User` → Update a user
- **DELETE** `/users/:id` → Delete a user

### **Assignments API** (`/assignments`)
- **GET** `/assignments` → Get all assignments
- **GET** `/assignments/organizer/:userId` → Get assignments by userId
- **GET** `/assignments/event/:eventId` → Get assignments by eventId
- **POST** `/assignments?userId=0795&eventId=1` → Assign an organizer
- **DELETE** `/assignments/user/:userId` → Delete all assignments of a user
- **DELETE** `/assignments/event/:eventId` → Delete all assignments for an event
- **DELETE** `/assignments?userId=0795&eventId=1` → Delete a specific assignment
