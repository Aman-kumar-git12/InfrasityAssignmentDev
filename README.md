<div align="center">

# Notes

**A full-stack note-taking app with secure, private notes for every user.**

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
<br>
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

[Features](#features) · [How it works](#how-it-works) · [Getting started](#getting-started) · [API](#api) · [Structure](#project-structure)

</div>

---

## Features

- **Auth:** sign up, log in and log out with a JWT stored in an **httpOnly cookie**; passwords hashed with bcrypt
- **Notes:** create, view, edit and delete, each on its own URL
- **Privacy:** users only ever see their own notes; anyone else's note returns `404`
- **Safe delete:** a confirmation dialog appears before anything is removed
- **Backend-driven messages:** every success and error message in the UI comes from the API
- **Clean UI:** dark green-black theme, hamburger sidebar, responsive, plain CSS

## How it works

```mermaid
flowchart LR
    UI["React pages"] --> AX["axiosClient<br/>(sends cookie)"]
    AX -->|HTTP| R["Routes"]
    R --> MW["Middlewares<br/>protect · validate · id check"]
    MW --> C["Controllers"]
    C --> S["Services"]
    S --> DB[("MongoDB")]
    MW -. error .-> EH["Error handler"]
    C -. error .-> EH
    EH -->|"{ success: false, message }"| AX
```

| Layer | Job |
| --- | --- |
| **Routes** | Connect each URL to its middlewares and controller |
| **Middlewares** | `protect` checks the JWT cookie, validators check the body, `validateObjectId` checks `:id` |
| **Controllers** | Read the request, call a service, send `{ success, message, data }` |
| **Services** | One function per file, holding all the database logic |
| **Error handler** | Turns any error into `{ success: false, message }` with the right status code |

**Ownership.** Every note query filters on both the note id and the logged-in user's id, so another user's note simply isn't found:

```js
Note.findOne({ _id: noteId, user: req.user.id });
```

## Getting started

**Prerequisites:** Node.js 20.19+ and a MongoDB database ([Atlas](https://www.mongodb.com/atlas) free tier works).

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env      # add your MONGO_URI and JWT_SECRET
npm run dev               # http://localhost:5001

# 2. Frontend (in a new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```

<details>
<summary><b>Environment variables</b></summary>

**`backend/.env`**

| Variable | Example |
| --- | --- |
| `PORT` | `5001` |
| `NODE_ENV` | `development` |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster/notes` |
| `JWT_SECRET` | any long random string |
| `JWT_EXPIRES_IN` | `7d` |
| `CLIENT_URL` | `http://localhost:5173` |

**`frontend/.env`**

| Variable | Example |
| --- | --- |
| `VITE_BACKEND_URL` | `http://localhost:5001` |

Generate a secret with:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

</details>

## API

Base URL `http://localhost:5001/api`. 🔒 = requires the auth cookie.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `POST` | `/auth/signup` | Create account and set cookie |
| `POST` | `/auth/login` | Log in and set cookie |
| `GET` | `/auth/me` 🔒 | Current user |
| `POST` | `/auth/logout` 🔒 | Clear cookie |
| `GET` | `/notes` 🔒 | List your notes |
| `POST` | `/notes` 🔒 | Create a note `{ title, content }` |
| `GET` | `/notes/:id` 🔒 | Get a note |
| `PUT` | `/notes/:id` 🔒 | Update a note |
| `DELETE` | `/notes/:id` 🔒 | Delete a note |

Every response has the same shape:

```jsonc
// success
{ "success": true, "message": "Note created successfully", "data": { "note": {} } }

// error
{ "success": false, "message": "Note not found" }
```

<details>
<summary><b>Error responses</b></summary>

| Status | When |
| --- | --- |
| `400` | Invalid JSON, failed validation, invalid note id |
| `401` | No cookie, invalid or expired token, wrong email or password |
| `404` | Note not found (or not yours), unknown route |
| `409` | Email already registered |
| `500` | Unexpected server error |

</details>

## Frontend routes

| Route | Page |
| --- | --- |
| `/login`, `/signup` | Auth pages |
| `/saved` | All your notes, each with **View · Edit · Delete** |
| `/new` | Write a new note |
| `/saved/:id/viewonly` | Read a note |
| `/saved/:id/edit` | Edit a note |

## Project structure

```
backend/src
├── config/         db.js
├── controllers/    auth, note
├── middlewares/    auth (protect), validate, validateObjectId, notFound, error
├── models/         User, Note
├── routes/         auth, note
├── services/       auth/*  notes/*   (one function per file)
├── utils/          sendResponse, generateToken, cookieOptions
├── validators/     auth, note
└── app.js          Express setup, routes, DB connection, server start

frontend/src
├── api/            axiosClient
├── components/     NotesLayout, Navbar, Sidebar, NoteForm, NoteCard, ConfirmDialog, Alert, Loader, route guards
├── context/        AuthContext
├── hooks/          useAuth, useFlashAlert
├── pages/          Login, Signup, SavedNotes, NoteView, NoteEditor, NotFound
├── services/       authService, noteService
└── styles/         index.css
```

## Troubleshooting

- **CORS error on port 5000 (macOS):** AirPlay Receiver uses port 5000, so this project uses **5001**.
- **MongoDB won't connect:** check `MONGO_URI`, and on Atlas add your IP under *Network Access*.
- **`.env` changes ignored:** restart `npm run dev`.
