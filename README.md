# coWORX Coworking Space — Premium Workspace & Inquiry Management

A sophisticated, high-performance website and membership enquiry system for **coWORX**, the premium coworking space located in Global City, Virar West. Built with a focus on aesthetics, user experience, and real-time utility.

![coWORX Landing Page Mockup](/public/images/main.jpeg)

## ✨ Key Features

- **🎬 Engaging Hero Experience**: Full-screen cinematic video background with glassmorphic UI elements and dynamic typography.
- **🛋️ Live Seat Availability Map**: Real-time interactive seat occupancy tracker across multiple zones (Entrance, Conference Room, Walls).
- **📋 Flexible Membership Plans**: Comprehensive pricing tiers ranging from 2-hour passes to full-team monthly packages.
- **📸 Premium Media Gallery**: Professional workspace showcase with a fluid image lightbox and responsive grid layout.
- **✉️ Lead Generation System**: Integrated ConvertKit subscription flow to capture and convert potential members with a "Day 1 Free Pass" offer.
- **💬 Direct WhatsApp Integration**: One-click communication channel for instant early-joiner pricing inquiries.
- **🌓 Seamless Dark Mode**: Tailored dark and light themes using `next-themes` for a premium reading experience at any time.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Lead MGMT**: [ConvertKit API](https://developers.convertkit.com/)
- **Storage**: JSON-based persistent file storage (Local / Vercel-ready)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DharmeshV05/coWORX-Form.git

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application in action.

### Production Build

```bash
npm run build
npm start
```

## 📂 Project Structure

- `src/app`: Next.js App Router (Pages, API routes)
- `src/components`: Reusable UI components (Navbar, SeatMap, InquiryForm)
- `src/components/ui`: Primitive shadcn components
- `src/lib`: Core logic (Seat management, JSON storage utility)
- `data/`: Persistent JSON files for inquiries and seat status
- `public/`: High-resolution assets and brand imagery

## 📍 Location

**coWORX Coworking Space**  
Poonam Avenue, Global City,  
Virar West, Maharashtra - 401303

---

Developed with ❤️ by the coWORX Team.
