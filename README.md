# Frontend - Wizard Store AI

Next.js 16 frontend with a wizard-themed UI for the AI-powered e-commerce chatbot.

## Features

- **Modern UI**: Dark wizard-themed interface with smooth animations (Framer Motion)
- **Real-time Chat**: Interactive chatbot with loading states and error handling
- **Context Display**: Shows retrieved sources with relevance scores
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **State Management**: Zustand for global state
- **Type Safety**: TypeScript for robust development

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Landing page
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   ├── about/           # About page
│   │   ├── chat/            # Chat page
│   │   └── products/        # Products page
│   ├── components/
│   │   ├── chat/            # Chat UI components
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── ContextPanel.tsx
│   │   ├── layout/          # Layout components
│   │   │   └── Navbar.tsx
│   │   └── ui/              # Reusable UI components
│   └── lib/
│       ├── api.ts           # API client for backend
│       └── store.ts         # Zustand state management
├── public/                  # Static assets
├── package.json
└── next.config.ts
```

## Technologies

- **Next.js 16**: React framework with Turbopack
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Zustand**: Lightweight state management
- **Lucide React**: Icon library

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
