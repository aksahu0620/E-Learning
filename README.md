# E‑Learning LMS

A full‑stack Learning Management System with course creation, lecture video uploads, checkout via Stripe, progress tracking, and student/instructor dashboards.

### Tech stack
- **Client**: React + Vite, Redux Toolkit Query, React Router, Tailwind CSS, Radix UI, Lucide Icons
- **Server**: Node.js, Express, MongoDB (Mongoose), JWT (HttpOnly cookies), Multer, Cloudinary, Stripe

## Monorepo layout
- `client/`: React SPA (Vite) – runs on `http://localhost:5173`
- `server/`: REST API (Express) – default `PORT=3000`

## Prerequisites
- Node.js 18+ and npm
- MongoDB (Atlas or local)
- Stripe account (Stripe CLI configured globally in system environment)
- Cloudinary account

## Environment variables
Create `.env` files as shown below.

### Server (`server/.env`)
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
WEBHOOK_ENDPOINT_SECRET=whsec_...  # Returned by Stripe CLI when you run `stripe listen`
```

### Client (`client/.env`)
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Quick Start

Follow these steps to run the application locally. You'll need **two terminal windows** open, with the Stripe webhook listener running in one of them.

> **Prerequisites:** Ensure you've installed dependencies by running `npm install` in both the `server/` and `client/` directories, and that you've configured your `.env` files as described in the [Environment Variables](#environment-variables) section above.

### Step 1: Start the Backend Server

In your first terminal, navigate to the server directory and start the backend:

```bash
cd server
nodemon server.js
```

The server will start on `http://localhost:${PORT}` (default `3000`). You can verify it's running by checking the health endpoint: `GET /`.

### Step 2: Start the Frontend Development Server

In your second terminal, navigate to the client directory and start the frontend:

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`.

### Step 3: Start Stripe Webhook Listener

if Stripe CLI is configured globally in your system environment, you can run the webhook listener in the same ide in a separate terminal.

First, authenticate with Stripe:

```bash
stripe login
```

Then, start the webhook listener:

```bash
stripe listen --forward-to http://localhost:8080/api/v1/purchase/webhook
```

**Important:** After running the `stripe listen` command, Stripe CLI will output a webhook signing secret (starts with `whsec_`). Copy this value and add it to your `server/.env` file as `WEBHOOK_ENDPOINT_SECRET`.

The webhook listener forwards Stripe events to your local server, enabling the purchase flow to complete. After successful payment, users are automatically enrolled and related lectures are unlocked.

## CORS and cookies
- Allowed origins are configured in `server/index.js`: `http://localhost:5173` and the production app URL. Update `allowedOrigins` if needed.
- Auth uses HttpOnly cookies with `SameSite=None`. In production this requires HTTPS. If cookies don’t set in local HTTP, consider using HTTPS locally or, only for local testing, adjust the cookie options in `server/utils/generateToken.js`.

## File uploads
- Images/videos are uploaded to Cloudinary.
- Local temp uploads are stored in `server/uploads/` via Multer before being sent to Cloudinary.

## API overview (base: `http://localhost:3000/api/v1`)
- `POST /user/register`, `POST /user/login`, `GET /user/logout`, `GET /user/profile`, `PUT /user/profile/update`
- `POST /course` (creator), `GET /course` (creator’s courses), `GET /course/published-courses`, `GET /course/:courseId`, `PUT /course/:courseId`, `PATCH /course/:courseId?publish=true|false`
- Lectures: `POST /course/:courseId/lecture`, `GET /course/:courseId/lecture`, `POST /course/:courseId/lecture/:lectureId`, `GET /course/lecture/:lectureId`, `DELETE /course/lecture/:lectureId`
- Search: `GET /course/search?query=&categories=a,b&sortByPrice=low|high`
- Purchase: `POST /purchase/checkout/create-checkout-session`, `POST /purchase/webhook`, `GET /purchase/course/:courseId/detail-with-status`, `GET /purchase/`
- Media: `POST /media/upload-video` (multipart `file`)
- Progress: `GET /progress/:courseId`, `POST /progress/:courseId/lecture/:lectureId/view`, `POST /progress/:courseId/complete`, `POST /progress/:courseId/incomplete`

## Scripts
- Server: `npm run dev` (nodemon), `npm start`
- Client: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

## Production notes
- Ensure all server env vars are set and HTTPS is enforced so cookies with `SameSite=None; Secure` work in browsers.
- Update CORS `allowedOrigins` in `server/index.js` with your deployed client URL.
- Set `VITE_API_BASE_URL` on the client to your deployed API base (e.g., `https://api.example.com/api/v1`).