# 🎟️ EventHub – Event Booking Platform

EventHub is a full-stack event booking platform developed using the MERN stack. It allows users to explore events, book tickets, and manage their reservations. Administrators can manage events, monitor seat availability, and handle bookings through a dedicated interface.

## ✨ Key Features

- **User Authentication:** Secure user registration and login using JWT.
- **OTP Verification:** Email-based OTP verification for user authentication.
- **Password Security:** Password hashing using bcrypt.
- **Event Discovery:** Browse and explore available events.
- **Event Booking:** Book tickets for available events.
- **Seat Management:** Track seat availability and prevent overbooking.
- **Booking Confirmation:** Automated email notifications using Nodemailer.
- **Admin Dashboard:** Create, update, and manage events.
- **Role-Based Access Control:** Separate access and permissions for users and administrators.
- **Responsive UI:** User-friendly interface for different screen sizes.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT (Authentication & Authorization)
- bcrypt (Password Hashing)
- CORS (Cross-Origin Resource Sharing)
- Nodemailer (Email Notifications)

### Database
- MongoDB
- Mongoose (Object Data Modeling)

### Development Tools
- Git & GitHub
- VS Code
- Postman
- Concurrently
- npm

## 📁 Project Structure

```text
EventHub/
│
├── Backend/
│   ├── controller/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── utils/
│   │
│   ├── index.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Palak-06-Tiwari/EventHub.git
```

### 2. Navigate to the Project Directory

```bash
cd EventHub
```

### 3. Install Dependencies

Install root dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
npm install --prefix Backend
```

Install frontend dependencies:

```bash
npm install --prefix Frontend
```

### 4. Configure Environment Variables

Create a `.env` file inside the `Backend` directory and configure the required environment variables.

These may include:

- MongoDB connection string
- JWT secret key
- Email service credentials
- Backend port

Use the exact environment variable names expected by your backend code.

**Important:** Never upload your `.env` file or expose secret credentials on GitHub.

### 5. Run the Application

Start both frontend and backend from the root directory:

```bash
npm run dev
```

Concurrently runs the frontend and backend development servers simultaneously.

## 🔄 Application Workflow

1. Users register and verify their email through OTP.
2. Users log in and receive authentication through JWT.
3. Authenticated users browse available events.
4. Users select an event and book tickets.
5. The backend processes the booking and updates seat availability.
6. Booking confirmation is sent through email.
7. Administrators manage events and monitor bookings through their dashboard.

## 🌐 Live Demo

**[Visit EventHub](https://eventhub-frontend-44cl.onrender.com)**


GitHub: [Palak-06-Tiwari](https://github.com/Palak-06-Tiwari)

---

⭐ If you find this project interesting, consider giving it a star!
