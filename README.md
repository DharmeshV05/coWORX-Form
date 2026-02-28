# coWORX Form

A membership enquiry and admin dashboard system for coWORX, a premium coworking space in Global City, Virar West.

## Features

- **Membership Enquiry Form**: Allows potential members to submit their details and membership requirements.
- **Admin Dashboard**: Secure dashboard to view, manage, and delete enquiries.
- **Export to Excel**: One-click export of enquiry data for offline management.
- **Dark Mode Support**: Seamless dark/light mode experience.
- **Responsive Design**: Optimized for mobile and desktop devices.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**
- **JSON File Storage** (Local)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Admin Dashboard

The admin dashboard is available at `/admin`.
Default password: `coworkx123`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: React components including the inquiry form and admin data table.
- `src/lib`: Data storage and utility functions.
- `data/inquiries.json`: Local storage for enquiry submissions.
