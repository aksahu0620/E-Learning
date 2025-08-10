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
- Stripe account + Stripe CLI (for webhooks in dev)
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

## Install & run
Open two terminals.

### 1) Server
```
cd server
npm install
npm run dev
```
Server starts on `http://localhost:${PORT}` (default `3000`). Health check: `GET /`.

### 2) Client
```
cd client
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## Stripe webhook (development)
The purchase flow completes via a Stripe webhook at `POST /api/v1/purchase/webhook`.

1) Install Stripe CLI and sign in.
2) Start the webhook forwarder (match your server port):
```
stripe listen --forward-to http://localhost:3000/api/v1/purchase/webhook
```
3) Copy the printed “Signing secret” and set it as `WEBHOOK_ENDPOINT_SECRET` in `server/.env`.

After successful payment, users are enrolled and related lectures are unlocked.

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
