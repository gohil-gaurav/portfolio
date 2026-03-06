# Quick Start: Discord Status with Lanyard

## 🚀 5-Minute Setup

### 1. Get Your Lanyard API Key (2 minutes)

1. Join Lanyard Discord: https://discord.gg/lanyard
2. Type command: `/api-key`
3. Copy the key Lanyard sends you

### 2. Run the Monitor Script (1 minute)

**On Windows:**
```bash
set LANYARD_API_KEY=your_key_here
npm run lanyard:monitor
```

**On Mac/Linux:**
```bash
export LANYARD_API_KEY=your_key_here
npm run lanyard:monitor
```

### 3. Test It (2 minutes)

1. Keep the script running
2. Open Discord and go online
3. Wait 10 seconds
4. Close Discord or set status to offline
5. Check your portfolio - should show "Last active X ago"

## ✅ That's It!

Your portfolio now shows the correct "last seen" time to ALL visitors, not just you.

## 🔄 Keep It Running

The script needs to run continuously. Options:

- **Simple**: Keep it running on your computer
- **Better**: Deploy to Replit (free) or Railway.app
- **Best**: Run on a VPS with PM2

See `LANYARD_SETUP.md` for detailed deployment options.

## 🐛 Troubleshooting

**Script says "API key not set"**
- Make sure you set the environment variable before running
- Try: `echo $LANYARD_API_KEY` (Mac/Linux) or `echo %LANYARD_API_KEY%` (Windows)

**Shows "Offline" instead of time**
- Script must run while you're online first
- Then go offline - it will save the timestamp
- Portfolio updates every 15 seconds

**401 or 403 error**
- Get a new API key: `/api-key` in Lanyard Discord
- Make sure you're still in the Lanyard server
