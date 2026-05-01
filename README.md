# Project Task Platform

A clean project and task management platform with email login, Google login support, MongoDB relationships, role-based project access, task assignment, status tracking, dashboard metrics, and light/dark mode.

## Stack

- React + Vite
- Express
- MongoDB + Mongoose
- JWT authentication
- SMTP email verification
- Google identity token verification

## Setup

Install dependencies:

```bash
npm run install:all
```

Create environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Update `server/.env` with your MongoDB Atlas URI, JWT secret, SMTP details, and Google client ID.

Example Atlas URI:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/project_task_platform?retryWrites=true&w=majority
```

Run the app:

```bash
npm run dev
```

Client: `http://localhost:5173`

Server: `http://localhost:5000`

## SMTP Email Login

Email signup now sends a verification link before the user can log in. For Gmail, create an app password and use:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="TaskFlow <your-email@gmail.com>"
APP_URL=http://localhost:5173
```

For deployment, set `APP_URL` to your Railway app URL.

## Google Login

Create a Google OAuth web client and put the same client ID in both env files:

```bash
server/.env: GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
client/.env: VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Add these local authorized JavaScript origins in Google Cloud:

```text
http://localhost:5173
http://127.0.0.1:5173
http://localhost:5174
http://127.0.0.1:5174
```

After deployment, add your Railway public domain as another authorized JavaScript origin.

## Railway Deployment

This project is set up as one Railway service. Express serves the built React app and the API from the same domain, so production uses `/api` and does not depend on localhost.

Railway settings:

```text
Build command: npm run build
Start command: npm start
Health check path: /health
```

Required Railway variables:

```bash
MONGO_URI=your-atlas-uri
JWT_SECRET=long-random-secret
CLIENT_ORIGINS=https://your-app.up.railway.app
APP_URL=https://your-app.up.railway.app
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="TaskFlow <your-email@gmail.com>"
VITE_API_URL=/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## Access Levels

- Admins can manage project details, members, roles, and tasks.
- Members can view assigned project data and update task progress.

## API Surface

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `POST /api/auth/verify-email`
- `GET /api/auth/me`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:projectId`
- `PATCH /api/projects/:projectId`
- `DELETE /api/projects/:projectId`
- `POST /api/projects/:projectId/members`
- `PATCH /api/projects/:projectId/members/:memberId`
- `DELETE /api/projects/:projectId/members/:memberId`
- `GET /api/projects/:projectId/tasks`
- `POST /api/projects/:projectId/tasks`
- `PATCH /api/projects/:projectId/tasks/:taskId`
- `DELETE /api/projects/:projectId/tasks/:taskId`
- `GET /api/dashboard`
