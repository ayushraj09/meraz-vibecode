# MERAZ 6.0 Festival Website - Transfer Instructions

## 📦 Files Included

This folder contains all necessary files to run the MERAZ 6.0 Festival Website in another repository.

## 📁 Folder Structure

```
Meraz_Transfer/
├── app/                      # Next.js app directory (all pages & API routes)
│   ├── about/
│   ├── api/
│   │   └── chat/            # ChatBot API with OpenRouter
│   ├── dashboard/           # User profile & registered events
│   ├── events/              # Events listing & registration
│   ├── login/               # Authentication page
│   ├── passes/              # Festival passes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # Reusable React components
│   ├── AICarousel.tsx       # AI-powered carousel
│   ├── ChatBot.tsx          # Resizable chatbot component
│   ├── CountdownTimer.tsx   # Festival countdown
│   ├── Footer.tsx           # Footer component
│   └── Navbar.tsx           # Navigation bar
├── context/                 # React context providers
│   └── AuthContext.tsx      # Authentication & event registration logic
├── data/                    # Optional Python chatbot files
│   ├── MERAZ_6.0_INFO.md   # Festival information
│   ├── meraz_chatbot.py    # Python chatbot (optional)
│   ├── meraz_vector_db.py  # Vector DB setup (optional)
│   ├── requirements.txt     # Python dependencies
│   └── README.md
├── package.json             # Node.js dependencies
├── package-lock.json        # Dependency lock file
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
├── .gitignore               # Git ignore rules
├── .env.example             # Environment variables template
├── README.md                # Project documentation
├── SETUP.md                 # Setup instructions
├── FEATURES.md              # Feature list
└── AI_PROMPTS.md            # AI chatbot prompts

```

## 🚀 How to Transfer & Setup

### Step 1: Copy Files to New Repository

```bash
# Navigate to your new repository
cd /path/to/new/repo

# Copy all files from Meraz_Transfer folder
cp -r /path/to/Meraz_Transfer/* .
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

1. Rename `.env.example` to `.env`
2. Add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_api_key_here
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Step 5: Build for Production

```bash
npm run build
npm start
```

## 🔑 Key Features

✅ **AI-Powered ChatBot** - Resizable chat interface with OpenRouter API integration
✅ **Event Registration System** - Users can register for events and view them on dashboard
✅ **Authentication System** - Login/Signup with localStorage
✅ **50+ Events** - Complete MERAZ 6.0 event schedule with filtering
✅ **Responsive Design** - Works on all devices
✅ **Steampunk Theme** - Gears of Glory theme throughout

## 📋 Important Notes

### Authentication
- Uses localStorage for user data (client-side only)
- In production, consider implementing a backend API with database

### Event Registration
- Event IDs are used for registration tracking
- Registered events are stored in user profile
- Dashboard displays all registered events with details

### ChatBot
- Requires OpenRouter API key
- Model: `tngtech/tng-r1t-chimera:free`
- Response caching enabled (1-hour TTL)
- Comprehensive MERAZ 6.0 knowledge base in system prompt

### API Routes
- `/api/chat` - ChatBot endpoint (POST)

## 🛠️ Dependencies

### Main Dependencies
- **Next.js 14.2.35** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **@openrouter/sdk** - AI integration
- **react-hot-toast** - Notifications
- **lucide-react** - Icons

### Dev Dependencies
- **@types/react**, **@types/node** - TypeScript types
- **postcss**, **autoprefixer** - CSS processing

## 📞 Support

For issues or questions about the transfer:
1. Check SETUP.md for detailed setup instructions
2. Check FEATURES.md for feature documentation
3. Check AI_PROMPTS.md for chatbot configuration

## 🎯 Verification Checklist

After transfer, verify:
- [ ] All files copied successfully
- [ ] `npm install` completes without errors
- [ ] `.env` file configured with API key
- [ ] Dev server runs (`npm run dev`)
- [ ] Homepage loads at localhost:3000
- [ ] ChatBot responds to queries
- [ ] Event registration works
- [ ] Dashboard shows registered events
- [ ] Login/Signup functionality works

## 📝 Known Issues

1. **API Chat Route TypeScript Errors** - Non-critical type errors in `/app/api/chat/route.ts` (lines 36, 148) - doesn't affect functionality
2. **localStorage** - Data persists only in browser, not shared across devices

## 🔄 Migration Steps for Other Repos

1. Copy entire `Meraz_Transfer` folder to new repository
2. Commit to git: `git add .` && `git commit -m "Add MERAZ website"`
3. Push: `git push origin main`
4. On target machine: clone repo, run `npm install`, configure `.env`, run `npm run dev`

---

**Generated on:** February 1, 2026
**MERAZ 6.0:** Steampunk - Gears of Glory (March 15-17, 2026)
