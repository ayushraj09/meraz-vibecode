# 🚀 Quick Setup Guide - Meraz 2026

## Prerequisites Installed ✓
- Node.js and npm are ready
- All dependencies have been installed

## Next Steps

### 1. Configure OpenRouter API (Optional but Recommended)

The chatbot uses OpenRouter API for AI responses. To enable it:

1. Visit [https://openrouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Navigate to "Keys" section
4. Create a new API key
5. Copy your API key

Then update the `.env.local` file:
```bash
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

**Note**: The chatbot will work even without an API key using fallback responses!

### 2. Start Development Server

```bash
npm run dev
```

The site will be available at: [http://localhost:3000](http://localhost:3000)

### 3. Test the Features

#### Homepage
- Visit [http://localhost:3000](http://localhost:3000)
- Check the countdown timer
- Scroll through AI carousel
- Click the chatbot button (bottom right)

#### Events Page
- Visit [http://localhost:3000/events](http://localhost:3000/events)
- Try the search functionality
- Filter by category
- Note: You need to login to register for events

#### Authentication
- Visit [http://localhost:3000/login](http://localhost:3000/login)
- Create a new account (Sign Up tab)
- Or use demo credentials:
  - Email: demo@example.com
  - Password: demo123

#### Dashboard
- After logging in, visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Register for some events
- View your registered events

#### Other Pages
- About: [http://localhost:3000/about](http://localhost:3000/about)
- Passes: [http://localhost:3000/passes](http://localhost:3000/passes)

### 4. Build for Production

```bash
npm run build
npm start
```

## Features to Showcase

### ✅ Must-Have Features (Completed)
1. **Modern Themed UI**: Dark purple-orange gradient theme
2. **User Authentication**: Complete signup/login system
3. **Dynamic Events**: 50+ events with search and filters
4. **Vibe Elements**: Countdown timer, AI carousel, chatbot

### ✅ Custom Features (Bonus Points)
1. **AI ChatBot**: OpenRouter integration with fallback
2. **Festival Passes**: 3-tier system with pricing
3. **User Dashboard**: Profile and registered events
4. **Comprehensive About**: Full festival information
5. **Responsive Design**: Mobile, tablet, desktop optimized

## AI Tooling Documentation

All AI prompts and tools used are documented in:
- `README.md` - Full documentation
- **AI Carousel**: Hover over slides to see prompts used
- **ChatBot System Prompt**: Check `/app/api/chat/route.ts`

## Project Structure

```
Meraz/
├── app/              # Next.js 14 app directory
│   ├── page.tsx      # Homepage
│   ├── events/       # Events listing
│   ├── about/        # About page
│   ├── passes/       # Festival passes
│   ├── login/        # Authentication
│   ├── dashboard/    # User dashboard
│   └── api/chat/     # ChatBot API
├── components/       # React components
├── context/          # Auth context
└── public/           # Static files
```

## Common Issues & Solutions

### Issue: ChatBot not responding
**Solution**: Add your OpenRouter API key to `.env.local` or use fallback mode

### Issue: Port 3000 already in use
**Solution**: Use a different port: `npm run dev -- -p 3001`

### Issue: Images not loading
**Solution**: Check internet connection (images from Unsplash CDN)

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_FESTIVAL_DATE`
5. Deploy!

### Manual Deployment

```bash
npm run build
# Upload .next folder and dependencies to your server
npm start
```

## VibeCoding Submission Checklist

- ✅ Source code on GitHub
- ✅ README.md with features and design choices
- ✅ AI tooling proof (prompts documented)
- ✅ All must-have features implemented
- ✅ Custom features added (chatbot, passes, dashboard)
- ✅ Responsive design
- ✅ Modern animations
- ✅ Themed UI

## Need Help?

Check the main `README.md` for detailed documentation, or:
- Review code comments
- Check console for errors
- Test in different browsers

## Performance Tips

1. **First Load**: May take a few seconds (loading assets)
2. **Images**: Cached after first load
3. **ChatBot**: Responses may take 2-3 seconds with API
4. **Mobile**: Optimized for touch interactions

---

**You're all set! Start the dev server and explore the site! 🎉**

```bash
npm run dev
```
