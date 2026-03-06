# Lanyard Discord Status Setup

This guide explains how to set up the Discord status indicator with global "last seen" tracking using Lanyard KV store.

## What This Does

- Shows your real-time Discord status (online/idle/dnd/offline) on your portfolio
- When you go offline, ALL visitors see the correct "Last active X time ago"
- Works globally across all browsers and devices

## Setup Instructions

### Step 1: Get Lanyard API Key

1. Join the Lanyard Discord server: https://discord.gg/lanyard
2. In any channel, type the command: `/api-key`
3. Copy the API key that Lanyard sends you (keep it secret!)

### Step 2: Set Up the Status Monitor Script

The script `update-lanyard-status.js` monitors your Discord status and updates Lanyard's KV store when you go offline.

#### Option A: Run Locally (Simple)

```bash
# Set your API key as environment variable
export LANYARD_API_KEY="your_api_key_here"

# Run the script
node update-lanyard-status.js
```

Keep this script running in the background on your computer.

#### Option B: Run on a Server (Recommended)

Deploy the script to a server that runs 24/7:

**Using a VPS (DigitalOcean, AWS, etc.):**

```bash
# Install Node.js on your server
# Upload update-lanyard-status.js

# Set environment variable
export LANYARD_API_KEY="your_api_key_here"

# Run with PM2 (process manager)
npm install -g pm2
pm2 start update-lanyard-status.js --name lanyard-monitor
pm2 save
pm2 startup
```

**Using Replit (Free option):**

1. Create a new Node.js Repl on https://replit.com
2. Upload `update-lanyard-status.js`
3. Add `LANYARD_API_KEY` to Secrets (lock icon)
4. Click Run
5. Enable "Always On" (requires Replit subscription) or use UptimeRobot to ping it

**Using Railway.app (Free tier available):**

1. Create account on https://railway.app
2. Create new project from GitHub repo
3. Add environment variable: `LANYARD_API_KEY`
4. Deploy

### Step 3: Verify It's Working

1. Run the script
2. You should see: `🚀 Starting Lanyard Status Monitor...`
3. Close Discord or set status to offline
4. Script should log: `⚫ User went offline, updating Lanyard KV...`
5. Check your portfolio - it should show "Last active X ago"

### Step 4: Deploy Your Portfolio

Your portfolio code is already set up to read from Lanyard KV. Just deploy to Vercel:

```bash
npm run build
# Deploy to Vercel
```

## How It Works

1. **Script monitors your Discord status** every 10 seconds
2. **When you're online/idle/dnd**: Stores current timestamp
3. **When you go offline**: Saves timestamp to Lanyard KV store
4. **Your portfolio reads from Lanyard KV**: All visitors see the same "last seen" time

## Troubleshooting

### "LANYARD_API_KEY environment variable not set"
- Make sure you set the environment variable before running the script
- On Windows: `set LANYARD_API_KEY=your_key_here`
- On Mac/Linux: `export LANYARD_API_KEY=your_key_here`

### "Failed to update KV: 401"
- Your API key is invalid or expired
- Get a new API key using `/api-key` in Lanyard Discord

### "Failed to update KV: 403"
- Make sure you're in the Lanyard Discord server
- Your Discord account must be connected to Lanyard

### Status shows "Offline" instead of "Last active X ago"
- The script needs to run at least once while you're online
- Then go offline - the script will save the timestamp
- Wait 15 seconds for your portfolio to refresh

## Alternative: Manual Update

If you don't want to run the script, you can manually update the KV store:

```bash
curl -X PUT \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: text/plain" \
  -d "1709683200000" \
  https://api.lanyard.rest/v1/users/1369896039858835531/kv/last_seen
```

Replace `1709683200000` with your timestamp (use https://currentmillis.com/)

## Security Notes

- Never commit your API key to Git
- Use environment variables or secrets management
- The API key only has access to YOUR Lanyard data
- Keep the key private

## Need Help?

- Lanyard Discord: https://discord.gg/lanyard
- Lanyard Docs: https://github.com/Phineas/lanyard
